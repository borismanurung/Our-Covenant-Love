import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function GET() {
  try {
    const [uniqueStat, visitStat, pageViewStat] = await Promise.all([
      prisma.siteStat.findUnique({ where: { key: 'unique_visitors' } }),
      prisma.siteStat.findUnique({ where: { key: 'total_visits' } }),
      prisma.siteStat.findUnique({ where: { key: 'page_views' } }),
    ]);

    return NextResponse.json({
      uniqueVisitors: uniqueStat?.value ?? 0,
      totalVisits: visitStat?.value ?? 0,
      pageViews: pageViewStat?.value ?? 0,
    });
  } catch (error) {
    console.error('Failed to get visitor stats:', error);
    return NextResponse.json(
      { uniqueVisitors: 0, totalVisits: 0, pageViews: 0 },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const cookies = req.cookies;
    const hasVisitorCookie = cookies.has('ocl_vid');
    const hasSessionCookie = cookies.has('ocl_sid');

    const ops: Promise<unknown>[] = [];

    // Always increment overall page views
    ops.push(
      prisma.siteStat.upsert({
        where: { key: 'page_views' },
        update: { value: { increment: 1 } },
        create: { key: 'page_views', value: 1 },
      })
    );

    let isNewVisitor = false;
    let isNewSession = false;

    if (!hasVisitorCookie) {
      isNewVisitor = true;
      ops.push(
        prisma.siteStat.upsert({
          where: { key: 'unique_visitors' },
          update: { value: { increment: 1 } },
          create: { key: 'unique_visitors', value: 1 },
        })
      );
    }

    if (!hasSessionCookie) {
      isNewSession = true;
      ops.push(
        prisma.siteStat.upsert({
          where: { key: 'total_visits' },
          update: { value: { increment: 1 } },
          create: { key: 'total_visits', value: 1 },
        })
      );
    }

    await Promise.all(ops);

    const [uniqueStat, visitStat, pageViewStat] = await Promise.all([
      prisma.siteStat.findUnique({ where: { key: 'unique_visitors' } }),
      prisma.siteStat.findUnique({ where: { key: 'total_visits' } }),
      prisma.siteStat.findUnique({ where: { key: 'page_views' } }),
    ]);

    const res = NextResponse.json({
      uniqueVisitors: uniqueStat?.value ?? 1,
      totalVisits: visitStat?.value ?? 1,
      pageViews: pageViewStat?.value ?? 1,
    });

    // If new unique visitor, set 1-year persistent cookie
    if (isNewVisitor) {
      const vid = crypto.randomUUID();
      res.cookies.set('ocl_vid', vid, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
      });
    }

    // If new session, set session cookie (valid for 12 hours)
    if (isNewSession) {
      const sid = crypto.randomUUID();
      res.cookies.set('ocl_sid', sid, {
        maxAge: 60 * 60 * 12, // 12 hours
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
      });
    }

    return res;
  } catch (error) {
    console.error('Failed to record visit:', error);
    return NextResponse.json(
      { uniqueVisitors: 0, totalVisits: 0, pageViews: 0 },
      { status: 500 }
    );
  }
}
