import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { getContentBySlug, getContentList } from '@/services/content.service';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User, BookOpen, Calendar, Video, Sparkles, ExternalLink } from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import ShareButtons from '@/components/ShareButtons';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const { locale, slug } = params;
  const item = await getContentBySlug(locale, slug);
  if (!item) return { title: locale === 'id' ? 'Khotbah Tidak Ditemukan | Our Covenant Love' : 'Sermon Not Found | Our Covenant Love' };

  return {
    title: `${item.translation.title} | Our Covenant Love`,
    description: item.translation.excerpt || undefined,
  };
}

export default async function SermonDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const { locale, slug } = params;
  const dict = getDictionary(locale);

  const item = await getContentBySlug(locale, slug);
  if (!item || item.type !== 'SERMON') {
    notFound();
  }

  const { translation } = item;

  // Fetch other sermons for related section
  const related = await getContentList({
    type: 'SERMON',
    locale,
    limit: 3,
  });
  const filteredRelated = related.items.filter((r) => r.id !== item.id).slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      {/* Back Link */}
      <Link
        href={`/${locale}/sermons`}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-covenant-700 hover:text-covenant-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{dict.common.backToList}</span>
      </Link>

      {/* Video Player Embed */}
      {item.videoUrl ? (
        <VideoPlayer url={item.videoUrl} title={translation.title} />
      ) : (
        <div className="w-full aspect-video rounded-2xl bg-slate-900 flex items-center justify-center text-slate-400">
          <div className="text-center space-y-2">
            <Video className="w-12 h-12 mx-auto text-slate-600" />
            <p className="text-sm">
              {locale === 'id' ? 'Tautan video belum tersedia' : 'Video link not available'}
            </p>
          </div>
        </div>
      )}

      {/* Header Info */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          {item.seriesTitle && (
            <span className="text-xs font-semibold uppercase tracking-wider text-covenant-700 bg-covenant-100 border border-covenant-200 px-3 py-1 rounded-full">
              {item.seriesTitle}
            </span>
          )}
          {item.isFeatured && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>{locale === 'id' ? 'Pengajaran Unggulan' : 'Featured Teaching'}</span>
            </span>
          )}
        </div>

        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {translation.title}
        </h1>

        {/* Details row */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-600 py-3 border-y border-slate-200">
          {item.speaker && (
            <div className="flex items-center gap-1.5 font-medium text-slate-800">
              <User className="w-4 h-4 text-covenant-600" />
              <span>{item.speaker}</span>
            </div>
          )}
          {item.scriptureRef && (
            <div className="flex items-center gap-1.5 text-covenant-800 font-mono text-xs font-medium">
              <BookOpen className="w-4 h-4" />
              <span>{item.scriptureRef}</span>
            </div>
          )}
          {item.publishedAt && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>
                {new Date(item.publishedAt).toLocaleDateString(
                  locale === 'id' ? 'id-ID' : 'en-US',
                  { year: 'numeric', month: 'long', day: 'numeric' }
                )}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Sermon Notes / Content */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">
          {locale === 'id' ? 'Rangkuman & Catatan Khotbah' : 'Sermon Summary & Notes'}
        </h2>
        <div className="prose prose-slate prose-lg max-w-none prose-headings:font-serif prose-p:leading-relaxed">
          <div className="whitespace-pre-line text-slate-700 leading-relaxed text-base sm:text-lg">
            {translation.body}
          </div>
        </div>
      </section>

      {/* External Links & Share */}
      <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <ShareButtons title={translation.title} locale={locale} />

        {item.videoUrl && (
          <a
            href={item.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200"
          >
            <span>{dict.sermons.watchOnYoutube}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {/* Related Sermons */}
      {filteredRelated.length > 0 && (
        <section className="pt-12 border-t border-slate-200 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            {dict.sermons.relatedTeachings}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredRelated.map((rel) => (
              <div
                key={rel.id}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-covenant-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {rel.seriesTitle && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-covenant-700 bg-covenant-50 px-2 py-0.5 rounded">
                      {rel.seriesTitle}
                    </span>
                  )}
                  <h3 className="font-serif font-bold text-base text-slate-900 hover:text-covenant-700 transition-colors mt-2">
                    <Link href={`/${locale}/sermons/${rel.translation.slug}`}>
                      {rel.translation.title}
                    </Link>
                  </h3>
                  {rel.speaker && (
                    <p className="text-xs text-slate-500 mt-1">{rel.speaker}</p>
                  )}
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono text-[11px]">{rel.scriptureRef}</span>
                  <Link
                    href={`/${locale}/sermons/${rel.translation.slug}`}
                    className="text-covenant-700 font-semibold"
                  >
                    {dict.common.watchNow} &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
