'use client';

import { useState, useRef } from 'react';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/getDictionary';
import { MUSIC_VIDEOS, MusicVideoItem } from '@/data/music-videos';
import AudioPlayer from '@/components/AudioPlayer';
import Link from 'next/link';
import Image from 'next/image';
import {
  Play,
  Music,
  Heart,
  Sparkles,
  ExternalLink,
  FileText,
  Headphones,
  Search,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Share2,
} from 'lucide-react';

interface MusicShowcaseProps {
  locale: Locale;
  dict: Dictionary;
}

export default function MusicShowcase({ locale, dict }: MusicShowcaseProps) {
  const isIndo = locale === 'id';
  const [selectedVideo, setSelectedVideo] = useState<MusicVideoItem>(MUSIC_VIDEOS[0]);
  const [activeTab, setActiveTab] = useState<'all' | 'original' | 'worship' | 'rally-choir'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLyrics, setShowLyrics] = useState(false);
  const [showAudio, setShowAudio] = useState(false);
  const playerRef = useRef<HTMLDivElement | null>(null);

  // Filter videos based on active category tab and search query
  const filteredVideos = MUSIC_VIDEOS.filter((video) => {
    if (activeTab !== 'all' && video.category !== activeTab) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        video.title.toLowerCase().includes(q) ||
        video.description.toLowerCase().includes(q) ||
        video.author.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleSelectVideo = (video: MusicVideoItem) => {
    setSelectedVideo(video);
    // Smooth scroll to the main video player
    if (playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tabs = [
    {
      id: 'all',
      label: isIndo ? 'Semua Video Musik' : 'All Music Videos',
      count: MUSIC_VIDEOS.length,
    },
    {
      id: 'original',
      label: isIndo ? 'Karya Orisinal' : 'Original Compositions',
      count: MUSIC_VIDEOS.filter((v) => v.category === 'original').length,
    },
    {
      id: 'worship',
      label: isIndo ? 'Pujian & Penyembahan' : 'Worship Ministry',
      count: MUSIC_VIDEOS.filter((v) => v.category === 'worship').length,
    },
    {
      id: 'rally-choir',
      label: isIndo ? 'Rally PPW & Paduan Suara' : 'Rallies & Choir',
      count: MUSIC_VIDEOS.filter((v) => v.category === 'rally-choir').length,
    },
  ];

  return (
    <div className="space-y-12">
      {/* ======================================================== */}
      {/* 1. CINEMA VIDEO PLAYER SPOTLIGHT                         */}
      {/* ======================================================== */}
      <section
        ref={playerRef}
        className="bg-gradient-to-br from-slate-950 via-covenant-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-covenant-800/60 shadow-2xl relative overflow-hidden space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-covenant-800/50 pb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-covenant-600/30 border border-covenant-500/40 text-covenant-300">
              <Music className="w-5 h-5 text-covenant-400" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs uppercase font-bold tracking-wider text-covenant-300">
                  {isIndo ? 'Sedang Diputar (Now Playing)' : 'Now Playing in Cinema Mode'}
                </span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-2xl text-white mt-0.5">
                {isIndo ? selectedVideo.title : selectedVideo.titleEn || selectedVideo.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-covenant-800/80 text-covenant-200 border border-covenant-600/50">
              {isIndo ? selectedVideo.categoryLabel : selectedVideo.categoryLabelEn}
            </span>
          </div>
        </div>

        {/* Embedded Video Player */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-covenant-700/60 bg-black">
          <iframe
            src={`${selectedVideo.embedUrl}?autoplay=1&rel=0`}
            title={selectedVideo.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Selected Video Metadata & Quick Action Buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-covenant-300">
              <span>
                {isIndo ? 'Penyanyi / Penggubah' : 'Artist / Composer'}:{' '}
                <strong className="text-white font-medium">{selectedVideo.author}</strong>
              </span>
              {selectedVideo.publishedDate && (
                <>
                  <span>•</span>
                  <span>{selectedVideo.publishedDate}</span>
                </>
              )}
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {isIndo ? selectedVideo.description : selectedVideo.descriptionEn}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-end">
            <a
              href={selectedVideo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{isIndo ? 'Tonton di YouTube Channel' : 'Watch on YouTube'}</span>
            </a>

            {selectedVideo.hasAudio && (
              <button
                type="button"
                onClick={() => setShowAudio(!showAudio)}
                className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors border ${
                  showAudio
                    ? 'bg-covenant-600 text-white border-covenant-500'
                    : 'bg-white/10 hover:bg-white/15 text-slate-200 border-white/20'
                }`}
              >
                <Headphones className="w-4 h-4 text-covenant-300" />
                <span>
                  {showAudio
                    ? isIndo
                      ? 'Tutup Audio Player'
                      : 'Close Audio Player'
                    : isIndo
                    ? 'Putar Versi MP3'
                    : 'Play Audio Version (MP3)'}
                </span>
              </button>
            )}

            {selectedVideo.hasLyrics && (
              <button
                type="button"
                onClick={() => setShowLyrics(!showLyrics)}
                className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors border ${
                  showLyrics
                    ? 'bg-covenant-600 text-white border-covenant-500'
                    : 'bg-white/10 hover:bg-white/15 text-slate-200 border-white/20'
                }`}
              >
                <FileText className="w-4 h-4 text-covenant-300" />
                <span>
                  {showLyrics
                    ? isIndo
                      ? 'Tutup Lirik & Akor'
                      : 'Hide Lyrics & Chords'
                    : isIndo
                    ? 'Lihat Lirik Lagu & Makna'
                    : 'View Lyrics & Meaning'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Audio Player Drawer (if opened) */}
        {showAudio && selectedVideo.audioUrl && (
          <div className="pt-4 border-t border-covenant-800/80 animate-in fade-in duration-200">
            <AudioPlayer
              src={selectedVideo.audioUrl}
              title={selectedVideo.title}
              locale={locale}
            />
          </div>
        )}

        {/* Lyrics & Biblical Story Drawer (if opened) */}
        {showLyrics && (
          <div className="pt-6 border-t border-covenant-800/80 space-y-6 animate-in fade-in duration-300">
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-covenant-700/50 space-y-4">
              <div className="flex items-center justify-between border-b border-covenant-800 pb-3">
                <h3 className="font-serif font-bold text-lg text-white">
                  {isIndo ? 'Lirik Lengkap: Good Guy' : 'Full Lyrics: Good Guy'}
                </h3>
                <span className="text-xs text-covenant-300 font-mono">
                  Composer: Boris Manurung
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <div className="space-y-4 bg-black/40 p-5 rounded-xl font-mono text-xs text-slate-200">
                  <p className="text-covenant-400 font-semibold uppercase">[Verse 1]</p>
                  <p>
                    I heard lotsa people talking about the movies<br />
                    They said it&apos;s a shame that the good guy has to die<br />
                    And it would have been nice if only the bad guys had died<br />
                    But I&apos;m telling you, friend, that this good guy has died for the bad guys
                  </p>

                  <p className="text-covenant-400 font-semibold uppercase">[Chorus 1]</p>
                  <p>
                    The movie started where there were many unbelievers<br />
                    And there were more and more bad guys<br />
                    Listening to what they&apos;re saying you wish they never exist<br />
                    Seeing what they&apos;re doing you are hoping they perish<br />
                    You know what you&apos;re talking, what you&apos;re thinking, what you&apos;re wishing, what you&apos;re hoping...<br />
                    <strong>We are the bad guys.</strong>
                  </p>
                </div>

                <div className="space-y-4 bg-black/40 p-5 rounded-xl font-mono text-xs text-slate-200">
                  <p className="text-covenant-400 font-semibold uppercase">[Chorus]</p>
                  <p>
                    You and I were the one who made the mess<br />
                    You and I were the one who set the cross<br />
                    We are the reason why this good guy left His place<br />
                    You and I were the one who drove them nails<br />
                    We&apos;re the ones who should have taken the blame<br />
                    He loves us, He really do care, as He came down, coming down here
                  </p>

                  <p className="text-covenant-400 font-semibold uppercase">[Outro]</p>
                  <p>
                    I can only give Him thanks<br />
                    I can only praise His name<br />
                    I will follow and obey<br />
                    From now on until the end
                  </p>
                </div>
              </div>

              {selectedVideo.slug && (
                <div className="text-right pt-2">
                  <Link
                    href={`/${locale}/music/${selectedVideo.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs text-covenant-300 hover:text-white underline font-semibold"
                  >
                    <span>
                      {isIndo
                        ? 'Buka Halaman Detail Lagu & Bagan Akor Khusus →'
                        : 'Open Dedicated Song Page & Chord Chart →'}
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* 2. CATEGORY TABS & SEARCH BAR                            */}
      {/* ======================================================== */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {tabs.map((tab) => {
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isTabActive
                    ? 'bg-covenant-800 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isTabActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isIndo ? 'Cari judul lagu, penyanyi...' : 'Search song title, artist...'}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-covenant-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. NEAT GRID OF VIDEOS                                   */}
      {/* ======================================================== */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
              {isIndo ? 'Daftar Video Musik YouTube' : 'YouTube Music Video Catalog'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {isIndo
                ? 'Klik salah satu video di bawah ini untuk langsung memutarnya di pemutar utama di atas.'
                : 'Click any video below to instantly load and play it in the main player above.'}
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {filteredVideos.length} {isIndo ? 'Video Tersedia' : 'Videos Available'}
          </span>
        </div>

        {filteredVideos.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 space-y-3">
            <Music className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-sm font-medium">
              {isIndo
                ? 'Tidak ada video musik yang cocok dengan pencarian Anda.'
                : 'No music videos match your search criteria.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredVideos.map((video) => {
              const isPlaying = selectedVideo.id === video.id;

              return (
                <div
                  key={video.id}
                  onClick={() => handleSelectVideo(video)}
                  className={`group bg-white rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${
                    isPlaying
                      ? 'border-covenant-600 ring-2 ring-covenant-500 shadow-xl scale-[1.01]'
                      : 'border-slate-200/90 hover:border-covenant-300 hover:shadow-lg'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Thumbnail with Play Hover Effect */}
                    <div className="relative w-full aspect-video bg-slate-900 overflow-hidden">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors" />

                      {/* Play Button Icon Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                            isPlaying
                              ? 'bg-emerald-600 text-white ring-4 ring-emerald-400/50'
                              : 'bg-rose-600 text-white'
                          }`}
                        >
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>

                      {/* Now Playing indicator on top */}
                      {isPlaying && (
                        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          <span>{isIndo ? 'Sedang Diputar' : 'Now Playing'}</span>
                        </div>
                      )}

                      {/* Category Badge on top right */}
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wide bg-slate-950/80 text-white backdrop-blur-xs">
                          {isIndo ? video.categoryLabel : video.categoryLabelEn}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 space-y-2">
                      <div className="text-[11px] font-medium text-covenant-700">
                        {video.author}
                      </div>

                      <h4 className="font-serif font-bold text-base text-slate-900 group-hover:text-covenant-800 transition-colors line-clamp-2">
                        {isIndo ? video.title : video.titleEn}
                      </h4>

                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {isIndo ? video.description : video.descriptionEn}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400 font-medium">
                      {video.publishedDate || (isIndo ? 'YouTube' : 'YouTube')}
                    </span>

                    <span
                      className={`font-semibold inline-flex items-center gap-1 transition-colors ${
                        isPlaying ? 'text-emerald-700' : 'text-covenant-700 group-hover:text-covenant-900'
                      }`}
                    >
                      <span>
                        {isPlaying
                          ? isIndo
                            ? 'Aktif di Layar'
                            : 'Currently Active'
                          : isIndo
                          ? 'Putar Video'
                          : 'Play Video'}
                      </span>
                      <Play className="w-3 h-3 fill-current" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* 4. WORSHIP THEOLOGY & VISION FOOTER                      */}
      {/* ======================================================== */}
      <section className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-covenant-950 via-slate-900 to-covenant-950 text-white shadow-xl border border-covenant-800/60 relative overflow-hidden text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-covenant-600/30 border border-covenant-500/30 text-covenant-300 text-xs font-semibold uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 text-covenant-400 fill-current" />
          <span>{isIndo ? 'Pujian Berakar Perjanjian' : 'Covenant Worship'}</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold">
          {isIndo
            ? 'Penyembahan yang Berakar pada Kebenaran Perjanjian Allah'
            : 'Worship Rooted in God’s Covenant Truth'}
        </h3>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {isIndo
            ? 'Setiap melodi dan lirik diciptakan bukan sekadar untuk kepuasan estetika musik, melainkan untuk meneguhkan janji setia, memulihkan mezbah keluarga, dan mengalirkan hadirat Allah di dalam rumah tangga.'
            : 'Every melody and lyric is created not merely for musical aesthetics, but to fortify covenant vows, rebuild family altars, and release the presence of God into the home.'}
        </p>

        <div className="pt-2">
          <a
            href="https://www.youtube.com/@borismanurung2626"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-covenant-700 hover:bg-covenant-800 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            <ExternalLink className="w-4 h-4" />
            <span>{isIndo ? 'Kunjungi Channel YouTube Lengkap' : 'Visit Full YouTube Channel'}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
