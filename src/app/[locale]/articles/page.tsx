import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { getContentList, getCategories } from '@/services/content.service';
import Link from 'next/link';
import { BookOpen, Search } from 'lucide-react';
import PhotoFrame from '@/components/PhotoFrame';
import ComicArticleGrid from '@/components/ComicArticleGrid';

export default async function ArticlesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams?: Promise<{ category?: string; q?: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const resolvedSearch = searchParams ? await searchParams : undefined;
  const selectedCategory = resolvedSearch?.category;
  const searchQuery = resolvedSearch?.q;

  const [articlesData, categories] = await Promise.all([
    getContentList({
      type: 'ARTICLE',
      locale,
      categorySlug: selectedCategory,
      search: searchQuery,
      limit: 20,
    }),
    getCategories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header with Marriage Nuance Visual */}
      <div className="bg-gradient-to-b from-covenant-50/70 via-white to-slate-50/50 rounded-3xl p-6 sm:p-10 border border-covenant-200/80 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-covenant-100 border border-covenant-300 text-covenant-900 text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-covenant-600" />
              <span>{locale === 'id' ? 'Koleksi Firman & Renungan' : 'Devotionals & Writings'}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
              {dict.articles.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
              {dict.articles.subtitle}
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-xs">
              <PhotoFrame
                src="/images/family/boris-wife-portrait.jpg"
                alt={locale === 'id' ? 'Pernikahan Kovenan' : 'Covenant Marriage'}
                aspectRatio="portrait"
                locale={locale}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        {/* Search input */}
        <form method="GET" className="max-w-xl mx-auto flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="q"
              defaultValue={searchQuery || ''}
              placeholder={dict.articles.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-covenant-500 shadow-xs"
            />
            {selectedCategory && (
              <input type="hidden" name="category" value={selectedCategory} />
            )}
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 bg-covenant-700 hover:bg-covenant-800 text-white rounded-xl text-sm font-medium transition-colors"
          >
            {locale === 'id' ? 'Cari' : 'Search'}
          </button>
        </form>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <Link
            href={`/${locale}/articles${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
              !selectedCategory
                ? 'bg-covenant-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {dict.common.allCategories}
          </Link>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            const catName = locale === 'id' ? cat.nameId : cat.nameEn;
            const queryParams = new URLSearchParams();
            queryParams.set('category', cat.slug);
            if (searchQuery) queryParams.set('q', searchQuery);

            return (
              <Link
                key={cat.id}
                href={`/${locale}/articles?${queryParams.toString()}`}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-covenant-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {catName}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      {articlesData.items.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 border border-slate-200 rounded-3xl max-w-2xl mx-auto p-8 space-y-4">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-slate-700">
            {dict.articles.noArticles}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            {locale === 'id'
              ? 'Silakan coba kata kunci lain atau pilih kategori yang berbeda.'
              : 'Try searching with different keywords or choosing another category.'}
          </p>
          <Link
            href={`/${locale}/articles`}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-covenant-800 bg-white border border-covenant-300 rounded-lg hover:bg-covenant-50 transition-colors"
          >
            {locale === 'id' ? 'Reset Pencarian' : 'Reset Search'}
          </Link>
        </div>
      ) : (
        <ComicArticleGrid items={articlesData.items as any} locale={locale} dict={dict} />
      )}
    </div>
  );
}
