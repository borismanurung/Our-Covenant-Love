import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import {
  getTogetherYouTubeVideos,
  getSoloYouTubeVideos,
  YOUTUBE_CHANNEL,
} from '@/services/youtube.service';
import { getContentList } from '@/services/content.service';
import Link from 'next/link';
import {
  Video,
  Play,
  Users,
  User,
  ExternalLink,
  Quote,
  Search,
  Sparkles,
  BookOpen,
  ArrowRight,
  Tv,
} from 'lucide-react';
import PhotoFrame from '@/components/PhotoFrame';

export default async function SermonsPage({
  params,
  searchParams,
}: {
  params: { locale: Locale };
  searchParams?: { q?: string };
}) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const searchQuery = searchParams?.q?.trim() || '';
  const isIndo = locale === 'id';

  // Fetch YouTube categorized video catalog
  const allTogether = await getTogetherYouTubeVideos();
  const allSolo = await getSoloYouTubeVideos();

  // Filter based on search query if present
  const filterByQuery = (v: (typeof allTogether)[0]) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const matchTitle = v.title.toLowerCase().includes(q);
    const matchCategory = v.category.toLowerCase().includes(q);
    const matchNarrative =
      (v.narrative?.id && v.narrative.id.toLowerCase().includes(q)) ||
      (v.narrative?.en && v.narrative.en.toLowerCase().includes(q));
    return matchTitle || matchCategory || matchNarrative;
  };

  const togetherVideos = allTogether.filter(filterByQuery);
  const soloVideos = allSolo.filter(filterByQuery);

  // Also fetch textual sermon transcripts for archive references
  const sermonsData = await getContentList({
    type: 'SERMON',
    locale,
    search: searchQuery || undefined,
    limit: 6,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* 1. Header with Marriage Nuance Visual & Blue/Purple Gradient */}
      <div className="bg-gradient-to-br from-covenant-50/90 via-white to-royalPurple-50/70 rounded-3xl p-6 sm:p-10 border border-covenant-200/80 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-covenant-100 to-royalPurple-100 border border-covenant-300 text-covenant-900 text-xs font-semibold uppercase tracking-wider">
              <Video className="w-3.5 h-3.5 text-covenant-700" />
              <span>{isIndo ? 'Kanal Khotbah & Video YouTube Resmi' : 'Official Sermon & YouTube Videos'}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
              {isIndo ? 'Khotbah & Video Pengajaran' : 'Sermons & Video Teachings'}
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
              {isIndo
                ? 'Koleksi lengkap video YouTube dari @borismanurung2626 yang dibagi menjadi dua kolom berdampingan: Video Bersama Pasutri di kolom kiri dan Pengajaran Ps. Boris Manurung sendiri dengan narasi firman di kolom kanan.'
                : 'Complete YouTube video library from @borismanurung2626 arranged in two side-by-side columns: Couple videos on the left and Ps. Boris Manurung solo teachings with spoken narratives on the right.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href={YOUTUBE_CHANNEL.subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <Tv className="w-4 h-4" />
                <span>{isIndo ? 'Subscribe @borismanurung2626' : 'Subscribe on YouTube'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={YOUTUBE_CHANNEL.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold shadow-xs transition-colors"
              >
                <span>{isIndo ? 'Buka Kanal YouTube' : 'Open YouTube Channel'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-xs">
              <PhotoFrame
                src="/images/family/boris-wife-blue-purple.jpg"
                alt="Ps. Boris Manurung dan Istri"
                aspectRatio="portrait"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Search Bar */}
      <form method="GET" className="max-w-2xl mx-auto flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            name="q"
            defaultValue={searchQuery}
            placeholder={
              isIndo
                ? 'Cari video, topik, atau kata kunci dalam narasi...'
                : 'Search videos, topics, or words in narratives...'
            }
            className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-covenant-500 shadow-xs"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-3 bg-covenant-700 hover:bg-covenant-800 text-white rounded-xl text-sm font-semibold transition-colors shadow-xs"
        >
          {isIndo ? 'Cari' : 'Search'}
        </button>
        {searchQuery && (
          <Link
            href={`/${locale}/sermons`}
            className="px-3.5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium transition-colors"
          >
            Reset
          </Link>
        )}
      </form>

      {/* Search results banner if searching */}
      {searchQuery && (
        <div className="text-center text-xs text-slate-600 bg-covenant-50/60 p-3 rounded-xl border border-covenant-200">
          <span>
            {isIndo
              ? `Menampilkan hasil pencarian untuk "${searchQuery}": ${togetherVideos.length} video bersama, ${soloVideos.length} video sendiri.`
              : `Showing search results for "${searchQuery}": ${togetherVideos.length} together videos, ${soloVideos.length} solo videos.`}
          </span>
        </div>
      )}

      {/* 3. SIDE-BY-SIDE TWO COLUMNS (FROM TOP TO BOTTOM) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* ========================================================= */}
        {/* LEFT COLUMN: TOGETHER (BORIS & HIS WIFE'S VIDEOS)         */}
        {/* ========================================================= */}
        <div className="space-y-6 bg-gradient-to-b from-covenant-50/50 via-white to-covenant-50/30 p-6 sm:p-7 rounded-3xl border border-covenant-200 shadow-xs">
          {/* Column Header */}
          <div className="flex items-center justify-between border-b border-covenant-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-covenant-600 flex items-center justify-center text-white shadow-xs">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-covenant-700 font-bold">
                  {isIndo ? 'KOLOM KIRI &bull; BERSAMA' : 'LEFT COLUMN &bull; TOGETHER'}
                </span>
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
                  {isIndo ? 'Boris & Istri (Video Bersama)' : 'Boris & Wife (Together)'}
                </h2>
              </div>
            </div>

            <span className="text-xs font-mono font-semibold text-covenant-800 bg-covenant-100 border border-covenant-300 px-2.5 py-1 rounded-full">
              {togetherVideos.length} {isIndo ? 'Video' : 'Videos'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {isIndo
              ? 'Pengajaran mendalam, dialog pasutri, dan kesaksian 25 tahun pernikahan kovenan yang dibagikan bersama oleh Ps. Boris Manurung dan istri.'
              : 'Marital teachings, candid discussions, and 25-year covenant marriage testimony shared together by Ps. Boris and his wife.'}
          </p>

          {/* Videos List (Top to Bottom) */}
          {togetherVideos.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300 text-slate-500 text-xs">
              {isIndo ? 'Tidak ada video bersama yang cocok dengan pencarian.' : 'No together videos matched your query.'}
            </div>
          ) : (
            <div className="space-y-6">
              {togetherVideos.map((video, idx) => (
                <div
                  key={video.id}
                  className="bg-white rounded-2xl border border-covenant-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-covenant-400 transition-all flex flex-col justify-between"
                >
                  {/* Embedded Video Player */}
                  <div className="relative w-full aspect-video bg-black">
                    <iframe
                      src={`${video.embedUrl}?autoplay=0&rel=0`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0"
                    />
                  </div>

                  {/* Video Meta & Title */}
                  <div className="p-5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-covenant-700 bg-covenant-100 px-2.5 py-0.5 rounded-md font-semibold">
                        #{idx + 1} &bull; {video.category}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {video.speakerName}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 leading-snug">
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-covenant-700 transition-colors"
                      >
                        {video.title}
                      </a>
                    </h3>

                    {/* Shared Insight / Narrative if present */}
                    {video.narrative && (
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 bg-slate-50 p-3 rounded-xl border border-slate-100 font-sans italic">
                        &ldquo;{video.narrative[locale] || video.narrative.id}&rdquo;
                      </p>
                    )}

                    {/* Direct YouTube Link Button */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-covenant-700 hover:text-covenant-900 group"
                      >
                        <Play className="w-3.5 h-3.5 fill-current text-rose-600" />
                        <span>{isIndo ? 'Buka & Tonton di YouTube' : 'Open & Watch on YouTube'}</span>
                        <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </a>

                      <span className="text-[11px] text-slate-400 font-mono">
                        {video.isShort ? 'YouTube Shorts' : 'Full Video'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: JUST ME (BORIS ALONE & OTHERS) WITH NARRATIVE */}
        {/* ========================================================= */}
        <div className="space-y-6 bg-gradient-to-b from-royalPurple-50/50 via-white to-royalPurple-50/30 p-6 sm:p-7 rounded-3xl border border-royalPurple-200 shadow-xs">
          {/* Column Header */}
          <div className="flex items-center justify-between border-b border-royalPurple-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-royalPurple-600 flex items-center justify-center text-white shadow-xs">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-royalPurple-700 font-bold">
                  {isIndo ? 'KOLOM KANAN &bull; SENDIRI' : 'RIGHT COLUMN &bull; JUST BORIS'}
                </span>
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
                  {isIndo ? 'Ps. Boris Manurung (Sendiri & Lainnya)' : 'Ps. Boris Manurung (Solo & Others)'}
                </h2>
              </div>
            </div>

            <span className="text-xs font-mono font-semibold text-royalPurple-800 bg-royalPurple-100 border border-royalPurple-300 px-2.5 py-1 rounded-full">
              {soloVideos.length} {isIndo ? 'Video' : 'Videos'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {isIndo
              ? 'Renungan hikmat praktis, edukasi relasi, dan pembentukan karakter oleh Ps. Boris Manurung, dilengkapi narasi teks apa yang disampaikan.'
              : 'Practical wisdom reflections, relationship coaching, and character formation by Ps. Boris Manurung, accompanied by full spoken narrative texts.'}
          </p>

          {/* Videos List (Top to Bottom) */}
          {soloVideos.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300 text-slate-500 text-xs">
              {isIndo ? 'Tidak ada video solo yang cocok dengan pencarian.' : 'No solo videos matched your query.'}
            </div>
          ) : (
            <div className="space-y-6">
              {soloVideos.map((video, idx) => (
                <div
                  key={video.id}
                  className="bg-white rounded-2xl border border-royalPurple-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-royalPurple-400 transition-all flex flex-col justify-between"
                >
                  {/* Embedded Video Player */}
                  <div className="relative w-full aspect-video bg-black">
                    <iframe
                      src={`${video.embedUrl}?autoplay=0&rel=0`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0"
                    />
                  </div>

                  {/* Video Meta & Title */}
                  <div className="p-5 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-royalPurple-700 bg-royalPurple-100 px-2.5 py-0.5 rounded-md font-semibold">
                        #{idx + 1} &bull; {video.category}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {video.speakerName}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 leading-snug">
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-royalPurple-700 transition-colors"
                      >
                        {video.title}
                      </a>
                    </h3>

                    {/* SPOKEN TEXT NARRATIVE: WHAT IS BEING SAID BY PS. BORIS MANURUNG */}
                    {video.narrative && (
                      <div className="rounded-xl bg-gradient-to-br from-royalPurple-50/70 via-slate-50 to-white p-4 border border-royalPurple-200/80 shadow-2xs space-y-2">
                        <div className="flex items-center justify-between border-b border-royalPurple-200/60 pb-1.5">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-royalPurple-900">
                            <Quote className="w-3.5 h-3.5 text-royalPurple-600" />
                            <span>
                              {isIndo
                                ? 'Narasi Firman yang Disampaikan oleh Ps. Boris Manurung:'
                                : 'Spoken Narrative by Ps. Boris Manurung:'}
                            </span>
                          </div>
                          <span className="text-[9px] font-mono text-royalPurple-700 bg-royalPurple-100 px-1.5 py-0.2 rounded font-medium">
                            {isIndo ? 'Teks Narasi' : 'Spoken Text'}
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed font-sans italic">
                          &ldquo;{video.narrative[locale] || video.narrative.id}&rdquo;
                        </p>
                      </div>
                    )}

                    {/* Direct YouTube Link Button */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-royalPurple-700 hover:text-royalPurple-900 group"
                      >
                        <Play className="w-3.5 h-3.5 fill-current text-rose-600" />
                        <span>{isIndo ? 'Buka & Tonton di YouTube' : 'Open & Watch on YouTube'}</span>
                        <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </a>

                      <span className="text-[11px] text-slate-400 font-mono">
                        {video.isShort ? 'YouTube Shorts' : 'Full Video'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. Textual Sermon Transcripts Archive (Complementary Section) */}
      {sermonsData.items.length > 0 && (
        <section className="pt-10 border-t border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-covenant-700 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isIndo ? 'Transkrip & Catatan Khotbah Tertulis' : 'Written Sermon Transcripts & Outlines'}</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                {isIndo ? 'Arsip Pengajaran Kovenan Tertulis' : 'Written Covenant Teachings Archive'}
              </h2>
            </div>

            <span className="text-xs text-slate-500 font-mono">
              {isIndo ? 'Dapat dibaca sebagai bahan renungan mandiri' : 'Available for personal devotion & study'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sermonsData.items.map((item) => {
              const translation = item.translation;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-covenant-300 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2.5">
                    {item.seriesTitle && (
                      <span className="text-[10px] font-mono uppercase tracking-wider text-covenant-700 bg-covenant-50 px-2 py-0.5 rounded">
                        {item.seriesTitle}
                      </span>
                    )}

                    <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-covenant-800 transition-colors leading-snug">
                      <Link href={`/${locale}/sermons/${translation.slug}`}>
                        {translation.title}
                      </Link>
                    </h3>

                    {translation.excerpt && (
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {translation.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">{item.speaker || 'Ps. Boris Manurung'}</span>
                    <Link
                      href={`/${locale}/sermons/${translation.slug}`}
                      className="inline-flex items-center gap-1 text-covenant-700 font-semibold group-hover:text-covenant-900"
                    >
                      <span>{isIndo ? 'Baca Transkrip' : 'Read Transcript'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
