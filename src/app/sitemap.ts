import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { locales } from '@/i18n/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Static section paths
  const staticSections = [
    '',
    '/our-story',
    '/marriage-family',
    '/articles',
    '/sermons',
    '/music',
    '/events',
    '/contact',
  ];

  const staticEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const section of staticSections) {
      staticEntries.push({
        url: `${baseUrl}/${locale}${section}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: section === '' ? 1.0 : 0.8,
      });
    }
  }

  // Dynamic published content items
  const items = await prisma.contentItem.findMany({
    where: { status: 'PUBLISHED' },
    include: { translations: true },
  });

  const dynamicEntries: MetadataRoute.Sitemap = [];

  for (const item of items) {
    const typePath =
      item.type === 'ARTICLE'
        ? 'articles'
        : item.type === 'SERMON'
        ? 'sermons'
        : item.type === 'SONG'
        ? 'music'
        : item.type === 'EVENT'
        ? 'events'
        : 'articles';

    for (const trans of item.translations) {
      dynamicEntries.push({
        url: `${baseUrl}/${trans.locale}/${typePath}/${trans.slug}`,
        lastModified: item.updatedAt,
        changeFrequency: 'monthly',
        priority: item.isFeatured ? 0.9 : 0.7,
      });
    }
  }

  return [...staticEntries, ...dynamicEntries];
}
