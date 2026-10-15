import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { getContentList } from '@/services/content.service';
import Link from 'next/link';
import { Music, Play, FileText, ArrowRight, Sparkles, Heart } from 'lucide-react';

export default async function MusicPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const dict = getDictionary(locale);

  const musicData = await getContentList({
    type: 'SONG',
    locale,
    limit: 20,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-covenant-100 border border-covenant-300 text-covenant-900 text-xs font-semibold uppercase tracking-wider">
          <Music className="w-3.5 h-3.5 text-covenant-600" />
          <span>{locale === 'id' ? 'Lagu Kovenan & Penyembahan' : 'Covenant Worship & Songs'}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
          {dict.music.title}
        </h1>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
          {dict.music.subtitle}
        </p>
      </div>

      {/* Music Grid */}
      {musicData.items.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 border border-slate-200 rounded-3xl max-w-2xl mx-auto p-8 space-y-4">
          <Music className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-slate-700">
            {dict.common.noResults}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            {locale === 'id'
              ? 'Belum ada lagu yang dipublikasikan saat ini.'
              : 'No songs published at this moment.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {musicData.items.map((item) => {
            const translation = item.translation;

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-covenant-200/80 p-6 sm:p-8 hover:shadow-lg hover:border-covenant-400 transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-covenant-100 text-covenant-800 text-xs font-semibold">
                      <Heart className="w-3.5 h-3.5 text-covenant-600 fill-current" />
                      <span>Original Worship</span>
                    </div>
                    {item.isFeatured && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Author */}
                  <div>
                    <h2 className="font-serif font-bold text-2xl text-slate-900 group-hover:text-covenant-800 transition-colors">
                      <Link href={`/${locale}/music/${translation.slug}`}>
                        {translation.title}
                      </Link>
                    </h2>
                    {item.author && (
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        {dict.common.author}: {item.author}
                      </p>
                    )}
                  </div>

                  {/* Excerpt or Story preview */}
                  {(translation.songStory || translation.excerpt) && (
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed italic bg-covenant-50/60 p-4 rounded-xl border border-covenant-100">
                      &ldquo;{translation.songStory || translation.excerpt}&rdquo;
                    </p>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {item.chordSheet && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                        <FileText className="w-3 h-3 text-slate-500" />
                        <span>Chord Chart</span>
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/${locale}/music/${translation.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-covenant-700 hover:bg-covenant-800 text-white text-xs font-semibold tracking-wide transition-colors shadow-xs"
                  >
                    <span>{dict.common.listenNow}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Ministry Worship Vision */}
      <section className="bg-gradient-to-r from-covenant-900 to-navy-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold">
          {locale === 'id'
            ? 'Pujian yang Berakar pada Kebenaran Kovenan'
            : 'Worship Rooted in Covenant Truth'}
        </h2>
        <p className="text-sm sm:text-base text-covenant-200 max-w-2xl mx-auto leading-relaxed">
          {locale === 'id'
            ? 'Setiap melodi dan lirik diciptakan bukan sekadar untuk kepuasan estetika musik, melainkan untuk meneguhkan janji setia, memulihkan mezbah keluarga, dan mengalirkan hadirat Allah di dalam rumah tangga.'
            : 'Every melody and lyric is crafted not merely for musical aesthetics, but to fortify covenant vows, rebuild family altars, and release the presence of God into the home.'}
        </p>
      </section>
    </div>
  );
}
