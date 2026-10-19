import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('ocl_session')?.value;
    const user = await getSessionUser(sessionToken);

    if (!user) {
      return NextResponse.json({
        authenticated: false,
        completedDays: [],
        startDate: null,
      });
    }

    const [progressRecords, settings] = await Promise.all([
      prisma.userReadingProgress.findMany({
        where: { userId: user.id, completed: true },
        select: { dayNumber: true },
      }),
      prisma.userReadingSettings.findUnique({
        where: { userId: user.id },
      }),
    ]);

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      completedDays: progressRecords.map((r) => r.dayNumber),
      startDate: settings?.startDate ? settings.startDate.toISOString() : null,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch reading progress' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('ocl_session')?.value;
    const user = await getSessionUser(sessionToken);
    const body = await request.json();

    const dayNumber = parseInt(body.dayNumber, 10);
    const isCompleted = body.completed !== false; // defaults to true unless explicitly false

    if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 365) {
      return NextResponse.json(
        { error: 'Invalid dayNumber. Must be between 1 and 365.' },
        { status: 400 }
      );
    }

    if (!user) {
      // Guest user response (client will persist to localStorage)
      return NextResponse.json({
        success: true,
        guest: true,
        dayNumber,
        completed: isCompleted,
      });
    }

    if (isCompleted) {
      await prisma.userReadingProgress.upsert({
        where: {
          userId_dayNumber: {
            userId: user.id,
            dayNumber,
          },
        },
        create: {
          userId: user.id,
          dayNumber,
          completed: true,
          completedAt: new Date(),
        },
        update: {
          completed: true,
          completedAt: new Date(),
        },
      });
    } else {
      await prisma.userReadingProgress.deleteMany({
        where: {
          userId: user.id,
          dayNumber,
        },
      });
    }

    return NextResponse.json({
      success: true,
      authenticated: true,
      dayNumber,
      completed: isCompleted,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to update reading progress' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('ocl_session')?.value;
    const user = await getSessionUser(sessionToken);
    const body = await request.json();

    const { startDate } = body;
    if (!startDate || isNaN(Date.parse(startDate))) {
      return NextResponse.json(
        { error: 'Invalid startDate. Must be a valid date string (YYYY-MM-DD).' },
        { status: 400 }
      );
    }

    const parsedDate = new Date(startDate);

    if (!user) {
      return NextResponse.json({
        success: true,
        guest: true,
        startDate: parsedDate.toISOString(),
      });
    }

    const updatedSettings = await prisma.userReadingSettings.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        startDate: parsedDate,
      },
      update: {
        startDate: parsedDate,
      },
    });

    return NextResponse.json({
      success: true,
      authenticated: true,
      startDate: updatedSettings.startDate.toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to update reading settings' },
      { status: 500 }
    );
  }
}
