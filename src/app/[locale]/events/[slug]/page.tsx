import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { getContentBySlug } from '@/services/content.service';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Users, Clock, Sparkles, ExternalLink, CheckCircle } from 'lucide-react';
import ShareButtons from '@/components/ShareButtons';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const { locale, slug } = params;
  const item = await getContentBySlug(locale, slug);
  if (!item) return { title: 'Event Not Found' };

  return {
    title: `${item.translation.title} | Our Covenant Love Events`,
    description: item.translation.excerpt || undefined,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const { locale, slug } = params;
  const dict = getDictionary(locale);

  const item = await getContentBySlug(locale, slug);
  if (!item || item.type !== 'EVENT') {
    notFound();
  }

  const { translation } = item;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Back Link */}
      <Link
        href={`/${locale}/events`}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-covenant-700 hover:text-covenant-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{dict.common.backToList}</span>
      </Link>

      {/* Header Info */}
      <header className="space-y-4">
        {item.isFeatured && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Featured Event</span>
          </span>
        )}

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
          {translation.title}
        </h1>

        {/* Highlight Metadata Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-covenant-50/70 border border-covenant-200 p-6 rounded-2xl">
          {item.eventDate && (
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-covenant-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-covenant-800 block">
                  {dict.events.dateAndTime}
                </span>
                <span className="text-sm font-medium text-slate-800">
                  {new Date(item.eventDate).toLocaleDateString(
                    locale === 'id' ? 'id-ID' : 'en-US',
                    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
                  )}
                </span>
              </div>
            </div>
          )}

          {item.eventLocation && (
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-covenant-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-covenant-800 block">
                  {dict.events.location}
                </span>
                <span className="text-sm font-medium text-slate-800">
                  {item.eventLocation}
                </span>
              </div>
            </div>
          )}

          {item.speaker && (
            <div className="flex items-start gap-3 sm:col-span-2 pt-2 border-t border-covenant-200/60">
              <Users className="w-5 h-5 text-covenant-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-covenant-800 block">
                  {dict.common.speaker} / Fasilitator
                </span>
                <span className="text-sm font-medium text-slate-800">
                  {item.speaker}
                </span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Event Description */}
      <section className="prose prose-slate prose-lg max-w-none prose-headings:font-serif">
        <h2 className="font-serif text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3">
          {dict.events.eventDetails}
        </h2>
        <div className="whitespace-pre-line text-slate-700 leading-relaxed text-base sm:text-lg">
          {translation.body}
        </div>
      </section>

      {/* Registration Card */}
      <div className="bg-gradient-to-r from-covenant-800 to-covenant-900 text-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-serif font-bold text-xl text-white">
            {locale === 'id' ? 'Amankan Tempat Anda' : 'Secure Your Spot'}
          </h3>
          <p className="text-xs sm:text-sm text-covenant-200">
            {locale === 'id'
              ? 'Pendaftaran terbatas demi kenyamanan interaksi intensif antar pasangan.'
              : 'Limited capacity to foster meaningful, personal interaction.'}
          </p>
        </div>

        {item.registrationUrl ? (
          <a
            href={item.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-covenant-400 hover:bg-covenant-300 text-covenant-950 font-bold text-sm transition-colors shadow-md flex-shrink-0"
          >
            <span>{dict.events.registerNow}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <Link
            href={`/${locale}/contact?subject=${encodeURIComponent(`Registrasi: ${translation.title}`)}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-covenant-400 hover:bg-covenant-300 text-covenant-950 font-bold text-sm transition-colors shadow-md flex-shrink-0"
          >
            <span>{dict.events.registerNow}</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        )}
      </div>

      {/* Share and Back */}
      <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <ShareButtons title={translation.title} />

        <Link
          href={`/${locale}/events`}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{dict.common.viewAll}</span>
        </Link>
      </div>
    </div>
  );
}
