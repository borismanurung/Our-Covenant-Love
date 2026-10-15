import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

async function requireAuth(request: NextRequest) {
  const token = request.cookies.get('ocl_session')?.value;
  const user = await getSessionUser(token);
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

export async function GET(request: NextRequest) {
  try {
    await requireAuth(request);

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || undefined;

    const items = await prisma.contentItem.findMany({
      where: type ? { type } : undefined,
      include: {
        translations: true,
        categories: true,
        tags: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ items });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Unauthorized' },
      { status: 401 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const body = await request.json();

    const {
      type,
      status = 'PUBLISHED',
      isFeatured = false,
      author,
      speaker,
      scriptureRef,
      seriesTitle,
      videoUrl,
      audioUrl,
      chordSheet,
      eventDate,
      eventLocation,
      registrationUrl,
      coverImage,
      translations,
    } = body;

    if (!type || !translations || !Array.isArray(translations) || translations.length === 0) {
      return NextResponse.json(
        { error: 'Content type and at least one translation are required.' },
        { status: 400 }
      );
    }

    const item = await prisma.contentItem.create({
      data: {
        type,
        status,
        isFeatured: Boolean(isFeatured),
        author: author || user.name,
        speaker,
        scriptureRef,
        seriesTitle,
        videoUrl,
        audioUrl,
        chordSheet,
        eventDate: eventDate ? new Date(eventDate) : null,
        eventLocation,
        registrationUrl,
        coverImage,
        translations: {
          create: translations.map((t: any) => ({
            locale: t.locale,
            title: t.title,
            slug: t.slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
            excerpt: t.excerpt || null,
            body: t.body || '',
            lyrics: t.lyrics || null,
            songStory: t.songStory || null,
            readingTimeMinutes: Number(t.readingTimeMinutes) || 3,
            metaTitle: t.metaTitle || t.title,
            metaDescription: t.metaDescription || t.excerpt || '',
          })),
        },
      },
      include: {
        translations: true,
      },
    });

    // Audit Log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'CREATE_CONTENT',
        entityType: 'CONTENT',
        entityId: item.id,
        details: `Created ${type}: ${translations[0]?.title}`,
      },
    }).catch(() => {});

    return NextResponse.json({ success: true, item });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to create content' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing content item id.' }, { status: 400 });
    }

    await prisma.contentItem.delete({
      where: { id },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'DELETE_CONTENT',
        entityType: 'CONTENT',
        entityId: id,
        details: `Deleted content item: ${id}`,
      },
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to delete content' },
      { status: 400 }
    );
  }
}
