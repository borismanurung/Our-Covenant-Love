'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  Eye,
  User,
  Share2,
} from 'lucide-react';
import { Locale } from '@/i18n/config';
import ComicReaderModal from './ComicReaderModal';

export interface ArticleItemProps {
  id: string;
  type: string;
  isFeatured: boolean;
  author?: string | null;
  scriptureRef?: string | null;
  seriesTitle?: string | null;
  chordSheet?: string | null;
  coverImage?: string | null;
  publishedAt?: string | Date | null;
  categories: Array<{ id: string; slug: string; nameId: string; nameEn: string }>;
  translation: {
    title: string;
    slug: string;
    excerpt?: string | null;
    readingTimeMinutes?: number | null;
  };
}

export interface ComicArticleGridProps {
  items: ArticleItemProps[];
  locale: Locale;
  dict: any;
}

export default function ComicArticleGrid({
  items,
  locale,
  dict,
}: ComicArticleGridProps) {
  const [activeModalComic, setActiveModalComic] = useState<{
    title: string;
    excerpt?: string | null;
    scriptureRef?: string | null;
    images: string[];
    articleSlug: string;
  } | null>(null);

  const isId = locale === 'id';

  // Helper to extract comic images
  const getComicImages = (item: ArticleItemProps): string[] | null => {
    if (item.seriesTitle === 'KARTUN_DIALOG' || item.categories.some((c) => c.slug === 'komik-dialog')) {
      if (item.chordSheet) {
        try {
          const parsed = JSON.parse(item.chordSheet);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        } catch {
          // ignore error
        }
      }
      if (item.coverImage) {
        return [item.coverImage];
      }
    }
    return null;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => {
          const translation = item.translation;
          const comicImages = getComicImages(item);
          const isComic = Boolean(comicImages && comicImages.length > 0);
          const category = item.categories[0];
          const catName = category
            ? locale === 'id'
              ? category.nameId
              : category.nameEn
            : null;

          // Single cover image acting as the preview "iklan"
          const displayImage = item.coverImage || (comicImages ? comicImages[0] : null);

          return (
            <article
              key={item.id}
              className={`bg-white rounded-3xl border overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group ${
                isComic
                  ? 'border-amber-200/80 hover:border-amber-400 bg-gradient-to-b from-amber-50/20 via-white to-white'
                  : 'border-slate-200/90 hover:border-covenant-300'
              }`}
            >
              <div>
                {/* Top Media / Thumbnail Banner */}
                {displayImage && (
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100">
                    <img
                      src={displayImage}
                      alt={translation.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent pointer-events-none" />

                    {/* If Comic: show overlay indicator & click trigger */}
                    {isComic && comicImages && (
                      <>
                        {/* Comic Badge */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/95 backdrop-blur-xs text-white text-[11px] font-bold shadow-md uppercase tracking-wider">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{dict.articles.comicBadge || (isId ? 'Komik Dialog' : 'Comic Dialogue')}</span>
                        </div>

                        {/* Page count pill */}
                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium border border-white/20 shadow-md">
                          <Layers className="w-3 h-3 text-amber-400" />
                          <span>
                            {comicImages.length} {dict.articles.pagesCount || (isId ? 'Halaman' : 'Pages')}
                          </span>
                        </div>

                        {/* Interactive Clickable Overlay to open reader modal directly */}
                        <button
                          type="button"
                          onClick={() =>
                            setActiveModalComic({
                              title: translation.title,
                              excerpt: translation.excerpt,
                              scriptureRef: item.scriptureRef,
                              images: comicImages,
                              articleSlug: translation.slug,
                            })
                          }
                          className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 bg-slate-950/30 backdrop-blur-[2px] transition-all duration-200"
                          title={dict.articles.comicTeaserHint || (isId ? 'Klik untuk membaca rentetan kartun' : 'Click to view full cartoon strip')}
                        >
                          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-covenant-800 hover:bg-covenant-700 text-white text-xs font-semibold shadow-xl border border-white/20 transform translate-y-2 group-hover:translate-y-0 transition-all">
                            <Eye className="w-3.5 h-3.5 text-amber-300" />
                            <span>{dict.articles.readComic || (isId ? 'Baca Rentetan Kartun' : 'Read Full Cartoon')}</span>
                          </span>
                        </button>
                      </>
                    )}
                  </div>
                )}

                {/* Content Body */}
                <div className="p-6 sm:p-7 space-y-4">
                  {/* Category and Badges */}
                  <div className="flex items-center justify-between gap-2">
                    {catName && (
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                          isComic
                            ? 'text-amber-800 bg-amber-50 border-amber-200'
                            : 'text-covenant-700 bg-covenant-50 border-covenant-200'
                        }`}
                      >
                        {catName}
                      </span>
                    )}

                    {item.isFeatured && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>{isId ? 'Unggulan' : 'Featured'}</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="font-serif font-bold text-xl text-slate-900 group-hover:text-covenant-800 transition-colors leading-snug">
                    <Link href={`/${locale}/articles/${translation.slug}`}>
                      {translation.title}
                    </Link>
                  </h2>

                  {/* Excerpt / Keterangan Singkat */}
                  {translation.excerpt && (
                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {translation.excerpt}
                    </p>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 sm:px-7 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  {item.author && (
                    <span className="font-medium text-slate-700 truncate max-w-[140px]">
                      {item.author}
                    </span>
                  )}
                  <div className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>
                      {translation.readingTimeMinutes || 3} {dict.common.readingTime}
                    </span>
                  </div>
                </div>

                {/* Primary CTA */}
                {isComic && comicImages ? (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveModalComic({
                        title: translation.title,
                        excerpt: translation.excerpt,
                        scriptureRef: item.scriptureRef,
                        images: comicImages,
                        articleSlug: translation.slug,
                      })
                    }
                    className="inline-flex items-center gap-1 text-amber-800 hover:text-amber-900 font-bold group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>{dict.articles.viewComicStrip || (isId ? 'Lihat Kartun' : 'View Strip')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <Link
                    href={`/${locale}/articles/${translation.slug}`}
                    className="inline-flex items-center gap-1 text-covenant-700 font-semibold group-hover:translate-x-0.5 transition-transform"
                    aria-label={dict.common.readMore}
                  >
                    <span>{dict.common.readMore}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Reader Modal */}
      {activeModalComic && (
        <ComicReaderModal
          isOpen={Boolean(activeModalComic)}
          onClose={() => setActiveModalComic(null)}
          title={activeModalComic.title}
          excerpt={activeModalComic.excerpt}
          scriptureRef={activeModalComic.scriptureRef}
          images={activeModalComic.images}
          articleSlug={activeModalComic.articleSlug}
          locale={locale}
        />
      )}
    </>
  );
}
