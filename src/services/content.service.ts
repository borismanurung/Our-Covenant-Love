import { prisma } from '@/lib/prisma';
import { Locale, defaultLocale } from '@/i18n/config';

export interface ContentListOptions {
  type?: 'ARTICLE' | 'DEVOTIONAL' | 'SERMON' | 'SONG' | 'TESTIMONY' | 'EVENT';
  locale: Locale;
  categorySlug?: string;
  tagSlug?: string;
  featuredOnly?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
  includeDrafts?: boolean;
}

export async function getContentList(options: ContentListOptions) {
  const {
    type,
    locale,
    categorySlug,
    tagSlug,
    featuredOnly,
    search,
    limit = 10,
    offset = 0,
    includeDrafts = false,
  } = options;

  const where: any = {};

  if (type) {
    where.type = type;
  }

  if (!includeDrafts) {
    where.status = 'PUBLISHED';
  }

  if (featuredOnly) {
    where.isFeatured = true;
  }

  if (categorySlug) {
    where.categories = {
      some: { slug: categorySlug },
    };
  }

  if (tagSlug) {
    where.tags = {
      some: { slug: tagSlug },
    };
  }

  if (search) {
    where.translations = {
      some: {
        OR: [
          { title: { contains: search } },
          { excerpt: { contains: search } },
          { body: { contains: search } },
        ],
      },
    };
  }

  const [total, items] = await Promise.all([
    prisma.contentItem.count({ where }),
    prisma.contentItem.findMany({
      where,
      include: {
        translations: true,
        categories: true,
        tags: true,
      },
      orderBy: [
        { isFeatured: 'desc' },
        { publishedAt: 'desc' },
        { createdAt: 'desc' },
      ],
      skip: offset,
      take: limit,
    }),
  ]);

  // Format with preferred locale and graceful fallback
  const localizedItems = items.map((item) => {
    const translation =
      item.translations.find((t) => t.locale === locale) ||
      item.translations.find((t) => t.locale === defaultLocale) ||
      item.translations[0];

    const availableLocales = item.translations.map((t) => t.locale);

    return {
      id: item.id,
      type: item.type,
      status: item.status,
      isFeatured: item.isFeatured,
      author: item.author,
      speaker: item.speaker,
      scriptureRef: item.scriptureRef,
      seriesTitle: item.seriesTitle,
      videoUrl: item.videoUrl,
      audioUrl: item.audioUrl,
      chordSheet: item.chordSheet,
      eventDate: item.eventDate,
      eventEndDate: item.eventEndDate,
      eventLocation: item.eventLocation,
      registrationUrl: item.registrationUrl,
      coverImage: item.coverImage,
      publishedAt: item.publishedAt,
      createdAt: item.createdAt,
      categories: item.categories,
      tags: item.tags,
      availableLocales,
      isExactLocale: translation?.locale === locale,
      translation: translation || {
        title: 'Untitled',
        slug: item.id,
        excerpt: '',
        body: '',
        lyrics: '',
        songStory: '',
        readingTimeMinutes: 3,
        metaTitle: '',
        metaDescription: '',
      },
    };
  });

  return {
    total,
    items: localizedItems,
    hasMore: offset + limit < total,
  };
}

export async function getContentBySlug(locale: Locale, slug: string) {
  // Try to find exact translation matching locale and slug
  let translation = await prisma.contentTranslation.findUnique({
    where: {
      locale_slug: {
        locale,
        slug,
      },
    },
    include: {
      contentItem: {
        include: {
          translations: true,
          categories: true,
          tags: true,
        },
      },
    },
  });

  // If not found in requested locale, check defaultLocale
  if (!translation && locale !== defaultLocale) {
    const fallback = await prisma.contentTranslation.findUnique({
      where: {
        locale_slug: {
          locale: defaultLocale,
          slug,
        },
      },
      include: {
        contentItem: {
          include: {
            translations: true,
            categories: true,
            tags: true,
          },
        },
      },
    });

    if (fallback) {
      translation = fallback;
    }
  }

  if (!translation) return null;

  const item = translation.contentItem;
  const targetTranslation =
    item.translations.find((t) => t.locale === locale) || translation;

  return {
    id: item.id,
    type: item.type,
    status: item.status,
    isFeatured: item.isFeatured,
    author: item.author,
    speaker: item.speaker,
    scriptureRef: item.scriptureRef,
    seriesTitle: item.seriesTitle,
    videoUrl: item.videoUrl,
    audioUrl: item.audioUrl,
    chordSheet: item.chordSheet,
    eventDate: item.eventDate,
    eventEndDate: item.eventEndDate,
    eventLocation: item.eventLocation,
    registrationUrl: item.registrationUrl,
    coverImage: item.coverImage,
    publishedAt: item.publishedAt,
    createdAt: item.createdAt,
    categories: item.categories,
    tags: item.tags,
    allTranslations: item.translations,
    translation: targetTranslation,
    isExactLocale: targetTranslation.locale === locale,
  };
}

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { nameId: 'asc' },
    include: {
      _count: {
        select: { items: true },
      },
    },
  });
}
