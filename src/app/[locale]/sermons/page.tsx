import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { getContentList } from '@/services/content.service';
import Link from 'next/link';
import { Video, Play, User, BookOpen, Sparkles, Search, ArrowRight } from 'lucide-react';

export default async function SermonsPage({
  params,
  searchParams,
}: {
  params: { locale: Locale };
  searchParams?: { q?: string };
}) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const searchQuery = searchParams?.q;

  const sermonsData = await getContentList({
    type: 'SERMON',
    locale,
    search: searchQuery,
    limit: 20,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-covenant-100 border border-covenant-300 text-covenant-900 text-xs font-semibold uppercase tracking-wider">
          <Video className="w-3.5 h-3.5 text-covenant-600" />
          <span>{locale === 'id' ? 'Media & Khotbah' : 'Media & Sermons'}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
          {dict.sermons.title}
        </h1>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
          {dict.sermons.subtitle}
        </p>
      </div>

      {/* Search Bar */}
      <form method="GET" className="max-w-xl mx-auto flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            name="q"
            defaultValue={searchQuery || ''}
            placeholder={locale === 'id' ? 'Cari khotbah, pembicara, firman...' : 'Search sermons, speakers, scripture...'}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-covenant-500 shadow-xs"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2.5 bg-covenant-700 hover:bg-covenant-800 text-white rounded-xl text-sm font-medium transition-colors"
        >
          {locale === 'id' ? 'Cari' : 'Search'}
        </button>
      </form>

      {/* Sermons Grid */}
      {sermonsData.items.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 border border-slate-200 rounded-3xl max-w-2xl mx-auto p-8 space-y-4">
          <Video className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-slate-700">
            {dict.common.noResults}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            {locale === 'id'
              ? 'Belum ada rekaman khotbah yang sesuai dengan pencarian Anda.'
              : 'No sermon recordings match your search criteria.'}
          </p>
          <Link
            href={`/${locale}/sermons`}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-covenant-800 bg-white border border-covenant-300 rounded-lg hover:bg-covenant-50 transition-colors"
          >
            {locale === 'id' ? 'Lihat Semua Khotbah' : 'View All Sermons'}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sermonsData.items.map((item) => {
            const translation = item.translation;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-covenant-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Video Thumbnail Placeholder / Card Header */}
                  <Link
                    href={`/${locale}/sermons/${translation.slug}`}
                    className="block relative aspect-video bg-gradient-to-br from-covenant-900 to-navy-950 overflow-hidden group/thumb"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-covenant-500/90 text-white flex items-center justify-center shadow-lg group-hover/thumb:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </div>
                    </div>
                    {item.seriesTitle && (
                      <span className="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wider text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md">
                        {item.seriesTitle}
                      </span>
                    )}
                    {item.isFeatured && (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[11px] font-semibold text-amber-900 bg-amber-400 px-2 py-0.5 rounded-md">
                        <Sparkles className="w-3 h-3" />
                        <span>Featured</span>
                      </span>
                    )}
                  </Link>

                  <div className="p-6 space-y-3">
                    <h2 className="font-serif font-bold text-lg text-slate-900 group-hover:text-covenant-800 transition-colors leading-snug">
                      <Link href={`/${locale}/sermons/${translation.slug}`}>
                        {translation.title}
                      </Link>
                    </h2>

                    {translation.excerpt && (
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {translation.excerpt}
                      </p>
                    )}
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex flex-col gap-2 text-xs text-slate-500">
                  <div className="flex items-center justify-between">
                    {item.speaker && (
                      <div className="flex items-center gap-1.5 font-medium text-slate-700">
                        <User className="w-3.5 h-3.5 text-covenant-600" />
                        <span>{item.speaker}</span>
                      </div>
                    )}
                    {item.scriptureRef && (
                      <div className="flex items-center gap-1 text-covenant-800 font-mono text-[11px]">
                        <BookOpen className="w-3 h-3" />
                        <span>{item.scriptureRef}</span>
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/${locale}/sermons/${translation.slug}`}
                    className="inline-flex items-center justify-between pt-2 border-t border-slate-200/60 text-covenant-700 font-semibold group-hover:text-covenant-900"
                  >
                    <span>{dict.common.watchNow}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
