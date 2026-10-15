import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { getContentList } from '@/services/content.service';
import { getLatestBorisYouTubeVideos } from '@/services/youtube.service';
import AudioPlayer from '@/components/AudioPlayer';
import VideoPlayer from '@/components/VideoPlayer';
import YouTubeShowcase from '@/components/YouTubeShowcase';
import {
  Heart,
  ArrowRight,
  BookOpen,
  Video,
  Music,
  Calendar,
  Sparkles,
  ShieldCheck,
  Users,
} from 'lucide-react';

export default async function HomePage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const dict = getDictionary(locale);

  // Fetch featured items and Boris YouTube channel latest uploads
  const [articlesData, sermonsData, songsData, eventsData, youtubeVideos] = await Promise.all([
    getContentList({ type: 'ARTICLE', locale, limit: 3 }),
    getContentList({ type: 'SERMON', locale, limit: 1 }),
    getContentList({ type: 'SONG', locale, limit: 1 }),
    getContentList({ type: 'EVENT', locale, limit: 1 }),
    getLatestBorisYouTubeVideos(),
  ]);

  const featuredSermon = sermonsData.items[0];
  const featuredSong = songsData.items[0] || {
    id: 'good-guy',
    author: 'Boris Manurung',
    audioUrl: '/audio/good-guy.mp3',
    translation: {
      title: 'Good Guy (by Boris Manurung)',
      slug: 'good-guy',
      excerpt:
        locale === 'id'
          ? 'Karya musik orisinal "Good Guy" yang digubah oleh Boris Manurung menceritakan tentang kasih pengorbanan Kristus bagi kita.'
          : 'An original musical work composed by Boris Manurung depicting the sacrificial love of Christ for humanity.',
    },
  };
  const featuredEvent = eventsData.items[0];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-covenant-100/80 via-white to-covenant-50/50 pt-16 sm:pt-24 pb-16 sm:pb-28 border-b border-covenant-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-covenant-200/80 border border-covenant-300 text-covenant-900 text-xs font-semibold tracking-wide shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-covenant-700" />
                <span>{dict.home.heroBadge}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]">
                {dict.home.heroTitle}
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {dict.home.heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href={`/${locale}/our-story`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-covenant-600 hover:bg-covenant-700 text-white font-medium text-sm shadow-md transition-all active:scale-95"
                >
                  <span>{dict.home.heroCtaPrimary}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={`/${locale}/articles`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-medium text-sm shadow-xs transition-colors"
                >
                  <span>{dict.home.heroCtaSecondary}</span>
                </Link>
              </div>

              {/* Ministry Key Scriptures */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-covenant-800 font-mono">
                <span className="px-2.5 py-1 bg-covenant-100 rounded-md border border-covenant-200">Kejadian 1:26–28</span>
                <span className="px-2.5 py-1 bg-covenant-100 rounded-md border border-covenant-200">Yohanes 17:21–23</span>
                <span className="px-2.5 py-1 bg-covenant-100 rounded-md border border-covenant-200">Efesus 5:31–32</span>
              </div>
            </div>

            {/* Right Visual / Logo Display */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 sm:w-88 md:w-96 aspect-square rounded-3xl p-6 bg-gradient-to-tr from-covenant-100 to-white border-2 border-covenant-200/80 shadow-2xl flex flex-col items-center justify-center text-center">
                <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 bg-covenant-900">
                  <Image
                    src="/images/logo.png"
                    alt="Our Covenant Love"
                    fill
                    className="object-contain p-2"
                    priority
                  />
                </div>
                <div className="font-serif font-bold text-slate-900 text-lg">
                  Our Covenant Love
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-covenant-700 mt-1">
                  Ministry & Family Showcase
                </div>
                <div className="text-[11px] text-slate-500 mt-1 italic">
                  Reflect His Image &bull; Reveal His Glory
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE VALUES (I-M-A-G-E) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-covenant-700 mb-2">
            Biblical Framework
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
            {dict.home.imageValuesTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {dict.home.imageValuesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {dict.ourStory.values.map((val) => (
            <div
              key={val.letter}
              className="bg-white rounded-2xl p-6 border border-covenant-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-covenant-100 border border-covenant-300 flex items-center justify-center font-serif text-2xl font-bold text-covenant-900 mb-4">
                {val.letter}
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900 mb-2">
                {val.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed flex-1">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED ARTICLES & TEACHINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-covenant-700 mb-1">
              {dict.common.articles}
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {dict.home.featuredTeachingsTitle}
            </h2>
          </div>
          <Link
            href={`/${locale}/articles`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-covenant-700 hover:text-covenant-900 group"
          >
            <span>{dict.common.viewAll}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articlesData.items.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-medium text-covenant-700">
                      {item.categories[0]?.nameId || 'Pernikahan'}
                    </span>
                    <span>{item.translation.readingTimeMinutes} {dict.common.readingTime}</span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-slate-900 hover:text-covenant-800 transition-colors mb-3 line-clamp-2">
                    <Link href={`/${locale}/articles/${item.translation.slug}`}>
                      {item.translation.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {item.translation.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{item.author}</span>
                  <Link
                    href={`/${locale}/articles/${item.translation.slug}`}
                    className="text-xs font-semibold text-covenant-700 hover:text-covenant-900 inline-flex items-center gap-1"
                  >
                    <span>{dict.common.readMore}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. YOUTUBE CHANNEL SHOWCASE (@borismanurung2626) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-rose-600 mb-1 flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5" />
              <span>{locale === 'id' ? 'Kanal YouTube Resmi' : 'Official YouTube Channel'}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {locale === 'id'
                ? 'Pengajaran & Video Singkat Ps. Boris Manurung'
                : 'Teachings & Videos by Ps. Boris Manurung'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}/sermons`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-covenant-700 hover:text-covenant-900 group"
            >
              <span>{dict.common.viewAll}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* YouTube Interactive Showcase Component */}
        <YouTubeShowcase locale={locale} videos={youtubeVideos} />
      </section>

      {/* 5. FEATURED ORIGINAL WORSHIP MUSIC */}
      {featuredSong && (
        <section className="bg-covenant-100/50 py-16 border-y border-covenant-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-covenant-200 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-covenant-800">
                  <Music className="w-4 h-4 text-covenant-600" />
                  <span>{dict.home.featuredMusicTitle}</span>
                </div>
                <Link
                  href={`/${locale}/music`}
                  className="text-xs font-semibold text-covenant-700 hover:underline"
                >
                  {dict.common.viewAll} &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-covenant-700 bg-covenant-100 px-2.5 py-1 rounded-md">
                    Original Worship Song
                  </span>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
                    {featuredSong.translation.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {featuredSong.translation.excerpt}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={`/${locale}/music/${featuredSong.translation.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-covenant-700 hover:bg-covenant-800 text-white text-xs font-semibold transition-colors shadow-xs"
                    >
                      <span>
                        {locale === 'id' ? 'Lihat Lirik & Bagan Akor' : 'View Lyrics & Chord Chart'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="md:col-span-5">
                  <AudioPlayer
                    src={featuredSong.audioUrl || '/audio/good-guy.mp3'}
                    title={featuredSong.translation.title || 'Good Guy (by Boris Manurung)'}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. UPCOMING EVENT / SEMINAR HIGHLIGHT */}
      {featuredEvent && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-covenant-950 rounded-3xl text-white p-8 sm:p-12 shadow-xl overflow-hidden relative">
            <div className="max-w-2xl relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-covenant-500/20 text-covenant-300 text-xs font-semibold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                <span>Pelayanan & Seminar Terdekat</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
                {featuredEvent.translation.title}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {featuredEvent.translation.excerpt}
              </p>

              <div className="text-xs sm:text-sm text-covenant-200 font-medium space-y-1">
                <div>📍 {featuredEvent.eventLocation}</div>
                <div>🗓️ {featuredEvent.eventDate ? new Date(featuredEvent.eventDate).toLocaleDateString() : 'Segera Diumumkan'}</div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                {featuredEvent.registrationUrl && (
                  <a
                    href={featuredEvent.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-covenant-500 hover:bg-covenant-400 text-covenant-950 font-bold text-sm shadow-md transition-all"
                  >
                    <span>{dict.events.registerNow}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
                <Link
                  href={`/${locale}/events/${featuredEvent.translation.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors"
                >
                  <span>{dict.events.eventDetails}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. FUTURE COUPLES INTERACTIVE MODULE PREVIEW */}
      <section id="couples-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-covenant-200/90 p-8 sm:p-12 shadow-xs">
          <div className="max-w-3xl mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-covenant-100 text-covenant-800 text-xs font-semibold uppercase tracking-wider mb-3">
              <Heart className="w-3.5 h-3.5 text-covenant-600 fill-current" />
              <span>{dict.couplesPreview.badge}</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {dict.couplesPreview.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {dict.couplesPreview.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dict.couplesPreview.features.map((feat, idx) => (
              <div
                key={idx}
                className="bg-covenant-50/70 rounded-2xl p-5 border border-covenant-200/60"
              >
                <div className="w-8 h-8 rounded-lg bg-covenant-200/80 text-covenant-800 flex items-center justify-center font-bold text-sm mb-3">
                  {idx + 1}
                </div>
                <h3 className="font-serif font-bold text-sm text-slate-900 mb-1.5">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
