import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { getLatestBorisYouTubeVideos } from '@/services/youtube.service';
import AudioPlayer from '@/components/AudioPlayer';
import YouTubeShowcase from '@/components/YouTubeShowcase';
import PhotoFrame from '@/components/PhotoFrame';
import {
  Heart,
  ArrowRight,
  BookOpen,
  Video,
  Music,
  Calendar,
  Sparkles,
  Users,
  MessageSquare,
  Compass,
} from 'lucide-react';

export default async function HomePage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const dict = getDictionary(locale);

  // Fetch YouTube channel latest uploads
  const youtubeVideos = await getLatestBorisYouTubeVideos();

  const featuredSong = {
    title: 'Good Guy (by Boris Manurung)',
    audioUrl: '/audio/good-guy.mp3',
    slug: 'good-guy',
    description:
      locale === 'id'
        ? 'Karya musik orisinal "Good Guy" yang digubah oleh Boris Manurung menceritakan tentang kasih pengorbanan Kristus bagi kita.'
        : 'An original musical work composed by Boris Manurung depicting the sacrificial love of Christ for humanity.',
  };

  const ministryCards = [
    {
      href: `/${locale}/our-story`,
      icon: Heart,
      title: dict.common.ourStory,
      description:
        locale === 'id'
          ? 'Perjalanan 25 tahun pernikahan kovenan, beban pendiri, dan nilai-nilai inti I-M-A-G-E.'
          : 'The 25-year covenant marriage journey, founders’ burden, and core I-M-A-G-E values.',
      cta: locale === 'id' ? 'Baca Kisah Kami' : 'Read Our Story',
    },
    {
      href: `/${locale}/marriage-family`,
      icon: Users,
      title: dict.common.marriageFamily,
      description:
        locale === 'id'
          ? 'Fondasi alkitabiah mengenai kovenan pernikahan, keintiman emosional, dan mezbah keluarga.'
          : 'Biblical foundation of covenant marriage, emotional intimacy, and family altar discipleship.',
      cta: locale === 'id' ? 'Masuk ke Halaman' : 'Explore Page',
    },
    {
      href: `/${locale}/articles`,
      icon: BookOpen,
      title: dict.common.articles,
      description:
        locale === 'id'
          ? 'Kumpulan renungan dan artikel teologis untuk memperkuat pemahaman kovenan Anda.'
          : 'Theological articles and devotionals to strengthen your covenant understanding.',
      cta: locale === 'id' ? 'Jelajahi Artikel' : 'Browse Articles',
    },
    {
      href: `/${locale}/sermons`,
      icon: Video,
      title: dict.common.sermons,
      description:
        locale === 'id'
          ? 'Rekaman pesan firman dan pengajaran mendalam untuk pembinaan keluarga.'
          : 'Sermon recordings and in-depth biblical teachings for family formation.',
      cta: locale === 'id' ? 'Tonton Khotbah' : 'Watch Sermons',
    },
    {
      href: `/${locale}/music`,
      icon: Music,
      title: dict.common.music,
      description:
        locale === 'id'
          ? 'Pujian dan penyembahan orisinal yang lahir dari hadirat Allah di tengah keluarga.'
          : 'Original praise and worship songs birthed from God’s presence in the home.',
      cta: locale === 'id' ? 'Dengarkan Lagu' : 'Listen to Music',
    },
    {
      href: `/${locale}/events`,
      icon: Calendar,
      title: dict.common.events,
      description:
        locale === 'id'
          ? 'Informasi seminar, lokakarya, dan retret pembinaan pernikahan yang akan datang.'
          : 'Upcoming marriage seminars, workshops, and family discipleship retreats.',
      cta: locale === 'id' ? 'Lihat Agenda' : 'View Events',
    },
    {
      href: `/${locale}/contact`,
      icon: MessageSquare,
      title: dict.common.contact,
      description:
        locale === 'id'
          ? 'Hubungi kami untuk konseling, permohonan doa bersama, atau persekutuan.'
          : 'Connect with us for counseling, prayer requests, or ministry fellowship.',
      cta: locale === 'id' ? 'Hubungi Kami' : 'Contact Us',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. INTRODUCTION & HERO SECTION WITH "Berdua.jpeg" */}
      <section className="relative overflow-hidden bg-gradient-to-b from-covenant-100/80 via-white to-covenant-50/50 pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-covenant-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-covenant-200/80 border border-covenant-300 text-covenant-900 text-xs font-semibold tracking-wide shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-royalPurple-600" />
                <span>{dict.home.heroBadge}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]">
                {dict.home.heroTitle}
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {dict.home.heroSubtitle}
              </p>

              {/* Action buttons leading directly to dedicated pages */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href={`/${locale}/our-story`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-covenant-600 hover:bg-covenant-700 text-white font-semibold text-sm shadow-md transition-all active:scale-95"
                >
                  <span>{dict.home.heroCtaPrimary}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={`/${locale}/marriage-family`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-sm shadow-xs transition-colors"
                >
                  <span>{dict.common.marriageFamily}</span>
                </Link>
              </div>

              {/* Key Scripture Anchors */}
              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs text-covenant-800 font-mono">
                <span className="px-2.5 py-1 bg-covenant-100 rounded-lg border border-covenant-200">Kejadian 1:26–28</span>
                <span className="px-2.5 py-1 bg-covenant-100 rounded-lg border border-covenant-200">Yohanes 17:21–23</span>
                <span className="px-2.5 py-1 bg-covenant-100 rounded-lg border border-covenant-200">Efesus 5:31–32</span>
              </div>
            </div>

            {/* Right Visual: Introduction photo "Berdua.jpeg" with covenant blue/purple frame and no text on photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm sm:max-w-md">
                <PhotoFrame
                  src="/images/family/berdua.jpeg"
                  alt="Boris Manurung dan Istri"
                  aspectRatio="portrait"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OFFICIAL YOUTUBE CHANNEL SHOWCASE (@borismanurung2626) */}
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

        {/* YouTube Interactive Showcase Component (Running Video + 3 Last Uploads) */}
        <YouTubeShowcase locale={locale} videos={youtubeVideos} />
      </section>

      {/* 3. FEATURED AUDIO PREVIEW: "Good Guy (by Boris Manurung)" */}
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
                  {featuredSong.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {featuredSong.description}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/${locale}/music/${featuredSong.slug}`}
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
                  src={featuredSong.audioUrl}
                  title={featuredSong.title}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXPLORE MINISTRY PATHWAYS (DISTRIBUTED PAGES PORTAL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-covenant-100 to-royalPurple-100 border border-covenant-200 text-covenant-900 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-royalPurple-600" />
            <span>{locale === 'id' ? 'Jelajahi Halaman Pelayanan' : 'Explore Ministry Pages'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
            {locale === 'id'
              ? 'Setiap Bagian Memiliki Halaman & Pembahasannya Sendiri'
              : 'Each Dimension with Its Dedicated Page & Teaching'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {locale === 'id'
              ? 'Pilihlah halaman yang ingin Anda pelajari lebih mendalam untuk menemukan kisah, pengajaran, media, lagu, atau agenda pembinaan.'
              : 'Select a dedicated page to dive into our full testimonies, teachings, media, original music, or formation gatherings.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministryCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.href}
                href={card.href}
                className="group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-covenant-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-covenant-100 to-royalPurple-100 border border-covenant-200 flex items-center justify-center text-covenant-800 group-hover:scale-110 group-hover:from-covenant-600 group-hover:to-royalPurple-600 group-hover:text-white transition-all duration-300 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-xl text-slate-900 group-hover:text-covenant-800 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-covenant-700 group-hover:text-covenant-900">
                  <span>{card.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
