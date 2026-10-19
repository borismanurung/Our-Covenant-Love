import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { getHomeCategorizedYouTubeVideos } from '@/services/youtube.service';
import AudioPlayer from '@/components/AudioPlayer';
import YouTubeShowcase from '@/components/YouTubeShowcase';
import PhotoFrame from '@/components/PhotoFrame';
import { getDayForDate, getReadingForDay } from '@/services/bible-reading.service';
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

  // Compute Today's Scripture reading for the home page highlight
  const now = new Date();
  const currentYear = now.getFullYear();
  const defaultStartDate = new Date(currentYear, 0, 1);
  const todayPlanDay = getDayForDate(now, defaultStartDate);
  const todayReading = getReadingForDay(todayPlanDay);

  const formattedDate = now.toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const otPassages = todayReading.passages.filter((p) => p.category === 'OT');
  const ntPassages = todayReading.passages.filter((p) => p.category === 'NT');
  const psalmPassages = todayReading.passages.filter((p) => p.category === 'PSALM');
  const proverbPassages = todayReading.passages.filter((p) => p.category === 'PROVERB');

  // Fetch YouTube channel latest categorized uploads (Together & Solo)
  const categorizedVideos = await getHomeCategorizedYouTubeVideos();

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
      href: `/${locale}/bible-reading`,
      icon: BookOpen,
      title: dict.common.bibleReading,
      description:
        locale === 'id'
          ? 'Rencana membaca seluruh 66 kitab Alkitab dalam 365 hari: PL, PB, Mazmur (2x), dan Amsal (4x).'
          : 'Read through all 66 books of the Bible in 365 days: OT, NT, Psalms (2x), and Proverbs (4x).',
      cta: locale === 'id' ? 'Buka Rencana Baca' : 'Start Reading Plan',
    },
    {
      href: `/${locale}/articles`,
      icon: Compass,
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
      <section className="relative overflow-hidden bg-gradient-to-b from-covenant-100/80 via-white to-covenant-50/50 pt-12 sm:pt-16 pb-16 sm:pb-24 border-b border-covenant-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Middle Top: Strong Title "Our Covenant Love" */}
          <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-covenant-200/80 border border-covenant-300 text-covenant-900 text-xs font-semibold tracking-wide shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-royalPurple-600" />
              <span>{dict.home.heroBadge}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Our Covenant Love
            </h1>

            <p className="font-serif text-lg sm:text-2xl text-covenant-800 font-semibold tracking-wide">
              {locale === 'id' ? 'Memancarkan Gambar & Kemuliaan Allah' : "Reflecting God's Glory"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-snug">
                {dict.home.heroTitle}
              </h2>

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

              {/* Key Scripture Anchors (John 17:21-23 deleted) */}
              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs text-covenant-800 font-mono">
                <span className="px-2.5 py-1 bg-covenant-100 rounded-lg border border-covenant-200">
                  {locale === 'id' ? 'Kejadian 1:26–28' : 'Genesis 1:26–28'}
                </span>
                <span className="px-2.5 py-1 bg-covenant-100 rounded-lg border border-covenant-200">
                  {locale === 'id' ? 'Efesus 5:31–32' : 'Ephesians 5:31–32'}
                </span>
              </div>
            </div>

            {/* Right Visual: Introduction photo "Berdua.jpeg" with covenant blue/purple frame and no text on photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm sm:max-w-md">
                <PhotoFrame
                  src="/images/family/berdua.jpeg"
                  alt={locale === 'id' ? 'Boris Manurung dan Istri' : 'Boris Manurung and Wife'}
                  aspectRatio="portrait"
                  locale={locale}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TODAY'S DAILY BIBLE READING HIGHLIGHT (4 STREAMS: OT, NT, PSALMS, PROVERBS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-covenant-900 via-slate-900 to-royalPurple-950 text-white p-6 sm:p-10 shadow-xl border border-covenant-700/60 space-y-6">
          {/* Subtle background glow */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-covenant-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-royalPurple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-covenant-200 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-royalPurple-300" />
                <span>{dict.bibleReadingPlan.heroBadge}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                {dict.bibleReadingPlan.homeTodayTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                {dict.bibleReadingPlan.homeTodaySubtitle}
              </p>
            </div>

            <div className="flex flex-col sm:items-end gap-1">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-covenant-800/80 border border-covenant-600/60 text-white text-xs font-bold tracking-wide shadow-xs">
                <Calendar className="w-3.5 h-3.5 text-covenant-300" />
                <span>{dict.bibleReadingPlan.dayLabel} {todayReading.day} {dict.bibleReadingPlan.ofDays}</span>
              </span>
              <span className="text-xs text-slate-400 capitalize">
                {formattedDate}
              </span>
            </div>
          </div>

          {/* 4 Streams Grid */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stream 1: Old Testament */}
            <Link
              href={`/${locale}/bible-reading`}
              className="group bg-white/5 hover:bg-white/10 border border-amber-500/30 hover:border-amber-400/60 rounded-2xl p-4 sm:p-5 transition-all duration-200 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-200 border border-amber-500/40">
                    {dict.bibleReadingPlan.otStream}
                  </span>
                  <BookOpen className="w-3.5 h-3.5 text-amber-300 opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="font-serif font-bold text-lg text-white group-hover:text-amber-200 transition-colors">
                  {otPassages.map((p) => (locale === 'id' ? p.displayRefId : p.displayRefEn)).join('; ')}
                </div>
              </div>
              <div className="text-[11px] font-medium text-amber-300/80 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>{locale === 'id' ? 'Baca Bagian PL' : 'Read OT Portion'}</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            {/* Stream 2: New Testament */}
            <Link
              href={`/${locale}/bible-reading`}
              className="group bg-white/5 hover:bg-white/10 border border-indigo-500/30 hover:border-indigo-400/60 rounded-2xl p-4 sm:p-5 transition-all duration-200 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-200 border border-indigo-500/40">
                    {dict.bibleReadingPlan.ntStream}
                  </span>
                  <BookOpen className="w-3.5 h-3.5 text-indigo-300 opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="font-serif font-bold text-lg text-white group-hover:text-indigo-200 transition-colors">
                  {ntPassages.map((p) => (locale === 'id' ? p.displayRefId : p.displayRefEn)).join('; ')}
                </div>
              </div>
              <div className="text-[11px] font-medium text-indigo-300/80 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>{locale === 'id' ? 'Baca Bagian PB' : 'Read NT Portion'}</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            {/* Stream 3: Psalms (2x/year) */}
            <Link
              href={`/${locale}/bible-reading`}
              className="group bg-white/5 hover:bg-white/10 border border-purple-500/30 hover:border-purple-400/60 rounded-2xl p-4 sm:p-5 transition-all duration-200 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-200 border border-purple-500/40">
                    {dict.bibleReadingPlan.psalmsStream}
                  </span>
                  <BookOpen className="w-3.5 h-3.5 text-purple-300 opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="font-serif font-bold text-lg text-white group-hover:text-purple-200 transition-colors">
                  {psalmPassages.map((p) => (locale === 'id' ? p.displayRefId : p.displayRefEn)).join('; ')}
                </div>
              </div>
              <div className="text-[11px] font-medium text-purple-300/80 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>{locale === 'id' ? 'Baca Mazmur' : 'Read Psalm'}</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            {/* Stream 4: Proverbs (4x/year) */}
            <Link
              href={`/${locale}/bible-reading`}
              className="group bg-white/5 hover:bg-white/10 border border-emerald-500/30 hover:border-emerald-400/60 rounded-2xl p-4 sm:p-5 transition-all duration-200 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-200 border border-emerald-500/40">
                    {dict.bibleReadingPlan.proverbsStream}
                  </span>
                  <BookOpen className="w-3.5 h-3.5 text-emerald-300 opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="font-serif font-bold text-lg text-white group-hover:text-emerald-200 transition-colors">
                  {proverbPassages.map((p) => (locale === 'id' ? p.displayRefId : p.displayRefEn)).join('; ')}
                </div>
              </div>
              <div className="text-[11px] font-medium text-emerald-300/80 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>{locale === 'id' ? 'Baca Amsal' : 'Read Proverb'}</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="relative pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
            <div className="text-xs text-slate-300 text-center sm:text-left">
              <span className="font-semibold text-white">{locale === 'id' ? 'Rangkuman Ayat Hari Ini' : "Today's Scripture Summary"}: </span>
              <span className="text-covenant-200 font-mono">
                {locale === 'id' ? todayReading.summaryRefId : todayReading.summaryRefEn}
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href={`/${locale}/bible-reading`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-covenant-500 to-indigo-600 hover:from-covenant-600 hover:to-indigo-700 text-white font-semibold text-sm shadow-md transition-all active:scale-95"
              >
                <BookOpen className="w-4 h-4" />
                <span>{dict.bibleReadingPlan.homeTodayCta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OFFICIAL YOUTUBE CHANNEL SHOWCASE (@borismanurung2626) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-rose-600 mb-1 flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5" />
              <span>{locale === 'id' ? 'Kanal YouTube Resmi' : 'Official YouTube Channel'}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {locale === 'id'
                ? 'Pengajaran & Video'
                : 'Teachings & Videos'}
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

        {/* YouTube Interactive Showcase Component (Dual Categories: Together & Solo with Narrative) */}
        <YouTubeShowcase
          locale={locale}
          together={categorizedVideos.together}
          solo={categorizedVideos.solo}
        />
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
                  {locale === 'id' ? 'Lagu Pujian Orisinal' : 'Original Worship Song'}
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
                  locale={locale}
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
