import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { getContentList } from '@/services/content.service';
import Link from 'next/link';
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, Church, Users, ExternalLink } from 'lucide-react';
import PhotoFrame from '@/components/PhotoFrame';

export default async function EventsPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const dict = getDictionary(locale);

  const eventsData = await getContentList({
    type: 'EVENT',
    locale,
    limit: 20,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header with Fellowship Nuance Visual */}
      <div className="bg-gradient-to-b from-covenant-50/70 via-white to-slate-50/50 rounded-3xl p-6 sm:p-10 border border-covenant-200/80 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-covenant-100 border border-covenant-300 text-covenant-900 text-xs font-semibold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-covenant-600" />
              <span>{locale === 'id' ? 'Konferensi, Retret & Lokakarya' : 'Conferences, Retreats & Workshops'}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
              {dict.events.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
              {dict.events.subtitle}
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-xs">
              <PhotoFrame
                src="/images/family/tassel-birthday.jpg"
                alt="Persekutuan & Acara Keluarga"
                aspectRatio="landscape"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Events List */}
      <section className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-slate-900">
          {dict.events.upcomingEvents}
        </h2>

        {eventsData.items.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-3">
            <Calendar className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-serif text-base font-bold text-slate-700">
              {locale === 'id' ? 'Belum Ada Jadwal Acara Terbuka' : 'No Public Events Scheduled Yet'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {locale === 'id'
                ? 'Kami sedang mempersiapkan jadwal seminar dan retret berikutnya. Hubungi kami jika ingin mengadakan pembinaan di komunitas Anda.'
                : 'We are preparing our upcoming seminar schedule. Contact us to host an event for your community.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {eventsData.items.map((item) => {
              const translation = item.translation;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-covenant-300 transition-all flex flex-col justify-between group"
                >
                  <div className="p-6 sm:p-8 space-y-5">
                    {/* Date and Feature Badge */}
                    <div className="flex items-center justify-between gap-2">
                      {item.eventDate && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-covenant-100 text-covenant-900 text-xs font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-covenant-600" />
                          <span>
                            {new Date(item.eventDate).toLocaleDateString(
                              locale === 'id' ? 'id-ID' : 'en-US',
                              { year: 'numeric', month: 'short', day: 'numeric' }
                            )}
                          </span>
                        </div>
                      )}
                      {item.isFeatured && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif font-bold text-2xl text-slate-900 group-hover:text-covenant-800 transition-colors">
                      <Link href={`/${locale}/events/${translation.slug}`}>
                        {translation.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    {translation.excerpt && (
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {translation.excerpt}
                      </p>
                    )}

                    {/* Details Box */}
                    <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
                      {item.eventLocation && (
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-covenant-600 flex-shrink-0 mt-0.5" />
                          <span>{item.eventLocation}</span>
                        </div>
                      )}
                      {item.speaker && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-covenant-600 flex-shrink-0" />
                          <span>{dict.common.speaker}: <strong>{item.speaker}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <Link
                      href={`/${locale}/events/${translation.slug}`}
                      className="text-xs font-semibold text-slate-700 hover:text-covenant-800 transition-colors"
                    >
                      {dict.events.eventDetails} &rarr;
                    </Link>

                    {item.registrationUrl ? (
                      <a
                        href={item.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-covenant-700 hover:bg-covenant-800 text-white text-xs font-semibold tracking-wide transition-colors shadow-xs"
                      >
                        <span>{dict.events.registerNow}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <Link
                        href={`/${locale}/events/${translation.slug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-covenant-700 hover:bg-covenant-800 text-white text-xs font-semibold tracking-wide transition-colors shadow-xs"
                      >
                        <span>{dict.events.registerNow}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* For Local Churches & Communities Section */}
      <section className="bg-covenant-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-covenant-800 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-covenant-300 font-semibold text-xs uppercase tracking-wider">
            <Church className="w-4 h-4" />
            <span>{dict.events.forChurches}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            {locale === 'id'
              ? 'Adakan Pembinaan Kovenan di Gereja Anda'
              : 'Host a Covenant Ministry in Your Church'}
          </h2>
          <p className="text-sm sm:text-base text-covenant-200/90 leading-relaxed">
            {dict.events.forChurchesDesc}
          </p>
        </div>

        <Link
          href={`/${locale}/contact`}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-covenant-400 hover:bg-covenant-300 text-covenant-950 font-bold text-sm transition-all shadow-md flex-shrink-0"
        >
          <span>{dict.events.inviteUs}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
