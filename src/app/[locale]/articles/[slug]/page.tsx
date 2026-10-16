import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { getContentBySlug, getContentList } from '@/services/content.service';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, Calendar, User, Sparkles } from 'lucide-react';
import ShareButtons from '@/components/ShareButtons';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const { locale, slug } = params;
  const item = await getContentBySlug(locale, slug);
  if (!item) return { title: locale === 'id' ? 'Artikel Tidak Ditemukan | Our Covenant Love' : 'Article Not Found | Our Covenant Love' };

  return {
    title: `${item.translation.title} | Our Covenant Love`,
    description: item.translation.excerpt || undefined,
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const { locale, slug } = params;
  const dict = getDictionary(locale);

  const item = await getContentBySlug(locale, slug);
  if (!item || item.type !== 'ARTICLE') {
    notFound();
  }

  const { translation } = item;
  const category = item.categories[0];
  const catName = category
    ? locale === 'id'
      ? category.nameId
      : category.nameEn
    : null;

  // Fetch recent articles for related section
  const related = await getContentList({
    type: 'ARTICLE',
    locale,
    limit: 3,
  });
  const filteredRelated = related.items.filter((r) => r.id !== item.id).slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Back Link */}
      <Link
        href={`/${locale}/articles`}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-covenant-700 hover:text-covenant-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{dict.common.backToList}</span>
      </Link>

      {/* Header */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          {catName && (
            <span className="text-xs font-semibold uppercase tracking-wider text-covenant-700 bg-covenant-100 border border-covenant-200 px-3 py-1 rounded-full">
              {catName}
            </span>
          )}
          {item.isFeatured && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>{locale === 'id' ? 'Unggulan' : 'Featured'}</span>
            </span>
          )}
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
          {translation.title}
        </h1>

        {/* Metadata bar */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-600 py-3 border-y border-slate-200">
          {item.author && (
            <div className="flex items-center gap-1.5 font-medium text-slate-800">
              <User className="w-4 h-4 text-covenant-600" />
              <span>{item.author}</span>
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
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>
              {translation.readingTimeMinutes || 3} {dict.common.readingTime}
            </span>
          </div>
        </div>

        {/* Scripture Reference Quote Box */}
        {item.scriptureRef && (
          <div className="bg-covenant-50 border-l-4 border-covenant-600 p-4 sm:p-5 rounded-r-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-covenant-800 block mb-1">
              {dict.common.scripture}
            </span>
            <div className="font-serif italic text-base sm:text-lg text-slate-800">
              &ldquo;{item.scriptureRef}&rdquo;
            </div>
          </div>
        )}
      </header>

      {/* Main Content Body */}
      <article className="prose prose-slate prose-lg max-w-none prose-headings:font-serif prose-headings:text-slate-900 prose-p:leading-relaxed prose-a:text-covenant-700">
        <div className="whitespace-pre-line text-slate-700 leading-relaxed text-base sm:text-lg space-y-4">
          {translation.body}
        </div>
      </article>

      {/* Social Sharing & Actions */}
      <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <ShareButtons title={translation.title} locale={locale} />

        <Link
          href={`/${locale}/articles`}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{dict.common.viewAll}</span>
        </Link>
      </div>

      {/* Related Articles */}
      {filteredRelated.length > 0 && (
        <section className="pt-12 border-t border-slate-200 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            {dict.articles.relatedArticles}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredRelated.map((rel) => (
              <div
                key={rel.id}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-covenant-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-serif font-bold text-base text-slate-900 hover:text-covenant-700 transition-colors">
                    <Link href={`/${locale}/articles/${rel.translation.slug}`}>
                      {rel.translation.title}
                    </Link>
                  </h3>
                  {rel.translation.excerpt && (
                    <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                      {rel.translation.excerpt}
                    </p>
                  )}
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{rel.author}</span>
                  <Link
                    href={`/${locale}/articles/${rel.translation.slug}`}
                    className="text-covenant-700 font-semibold"
                  >
                    {dict.common.readMore} &rarr;
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
