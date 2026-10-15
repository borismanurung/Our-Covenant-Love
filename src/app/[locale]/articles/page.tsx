import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { getContentList, getCategories } from '@/services/content.service';
import Link from 'next/link';
import { BookOpen, Clock, Calendar, ArrowRight, Search, Sparkles } from 'lucide-react';

export default async function ArticlesPage({
  params,
  searchParams,
}: {
  params: { locale: Locale };
  searchParams?: { category?: string; q?: string };
}) {
  const { locale } = params;
  const dict = getDictionary(locale);

  const selectedCategory = searchParams?.category;
  const searchQuery = searchParams?.q;

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
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-covenant-100 border border-covenant-300 text-covenant-900 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-covenant-600" />
          <span>{locale === 'id' ? 'Koleksi Firman & Renungan' : 'Devotionals & Writings'}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
          {dict.articles.title}
        </h1>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
          {dict.articles.subtitle}
        </p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesData.items.map((item) => {
            const translation = item.translation;
            const category = item.categories[0];
            const catName = category
              ? locale === 'id'
                ? category.nameId
                : category.nameEn
              : null;

            return (
              <article
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-covenant-300 transition-all flex flex-col justify-between group"
              >
                <div className="p-6 sm:p-7 space-y-4">
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2">
                    {catName && (
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-covenant-700 bg-covenant-50 border border-covenant-200 px-2.5 py-1 rounded-md">
                        {catName}
                      </span>
                    )}
                    {item.isFeatured && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="font-serif font-bold text-xl text-slate-900 group-hover:text-covenant-800 transition-colors leading-snug">
                    <Link href={`/${locale}/articles/${translation.slug}`}>
                      {translation.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  {translation.excerpt && (
                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {translation.excerpt}
                    </p>
                  )}
                </div>

                {/* Footer Info */}
                <div className="px-6 sm:px-7 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    {item.author && (
                      <span className="font-medium text-slate-700">{item.author}</span>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {translation.readingTimeMinutes || 3} {dict.common.readingTime}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/${locale}/articles/${translation.slug}`}
                    className="inline-flex items-center gap-1 text-covenant-700 font-semibold group-hover:translate-x-0.5 transition-transform"
                    aria-label={dict.common.readMore}
                  >
                    <span>{dict.common.readMore}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
