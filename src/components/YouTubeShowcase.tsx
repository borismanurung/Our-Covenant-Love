'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Locale } from '@/i18n/config';
import { YouTubeVideoItem, YOUTUBE_CHANNEL } from '@/services/youtube.service';
import {
  Play,
  ExternalLink,
  Sparkles,
  Tv,
  CheckCircle2,
  Users,
  User,
  Quote,
  Layers,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface YouTubeShowcaseProps {
  locale: Locale;
  together: {
    latest: YouTubeVideoItem;
    previous: YouTubeVideoItem[];
  };
  solo: {
    latest: YouTubeVideoItem;
    previous: YouTubeVideoItem[];
  };
}

export default function YouTubeShowcase({
  locale,
  together,
  solo,
}: YouTubeShowcaseProps) {
  // Active category filter: 'all' | 'together' | 'solo'
  const [activeTab, setActiveTab] = useState<'all' | 'together' | 'solo'>('all');

  // Interactive selected video for Category 1 (Together)
  const [activeTogetherVideo, setActiveTogetherVideo] = useState<YouTubeVideoItem>(
    together.latest
  );

  // Interactive selected video for Category 2 (Solo)
  const [activeSoloVideo, setActiveSoloVideo] = useState<YouTubeVideoItem>(
    solo.latest
  );

  const isIndo = locale === 'id';

  return (
    <div className="bg-gradient-to-br from-slate-950 via-covenant-950 to-royalPurple-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-10">
      {/* 1. Official Channel Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-royalPurple-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
            <Tv className="w-6 h-6" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-white tracking-tight">
                {YOUTUBE_CHANNEL.title}
              </h3>
              <span className="text-xs font-mono text-rose-300 bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 rounded-full font-semibold">
                {YOUTUBE_CHANNEL.handle}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              {isIndo
                ? 'Dua Kategori Pengajaran: Video Bersama Pasutri & Renungan Pribadi Ps. Boris Manurung'
                : 'Two Video Categories: Couple Ministry with Wife & Solo Reflections with Spoken Narrative'}
            </p>
          </div>
        </div>

        {/* Action Controls & Subscribe Button */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={YOUTUBE_CHANNEL.subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-rose-600/30"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isIndo ? 'Subscribe di YouTube' : 'Subscribe on YouTube'}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-75" />
          </a>

          <Link
            href={`/${locale}/sermons`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold border border-white/15 transition-all"
          >
            <span>{isIndo ? 'Daftar Lengkap Khotbah' : 'All Videos (2 Columns)'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Category Tab Switcher Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 p-2 rounded-2xl border border-white/10">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-covenant-600 to-royalPurple-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isIndo ? 'Semua Kategori (Keduanya)' : 'All Categories (Both)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('together')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'together'
                ? 'bg-covenant-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-covenant-300" />
            <span>{isIndo ? '1. Bersama Istri (Pasutri)' : '1. With Wife (Together)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('solo')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'solo'
                ? 'bg-royalPurple-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <User className="w-3.5 h-3.5 text-royalPurple-300" />
            <span>{isIndo ? '2. Ps. Boris Sendiri (dengan Narasi)' : '2. Just Boris (with Narrative)'}</span>
          </button>
        </div>

        <div className="text-[11px] text-slate-400 font-mono px-2 hidden sm:block">
          {isIndo ? 'Menampilkan video terkini + 2 video sebelumnya' : 'Showing latest video + 2 previous uploads'}
        </div>
      </div>

      {/* 3. SHOWCASE CATEGORY 1: TOGETHER ME & MY WIFE */}
      {(activeTab === 'all' || activeTab === 'together') && (
        <div className="space-y-6 pt-2">
          {/* Category Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-covenant-700/40 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-covenant-600/30 border border-covenant-500/40 flex items-center justify-center text-covenant-300">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-covenant-400 font-bold">
                    {isIndo ? 'Kategori 1' : 'Category 1'}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-covenant-400" />
                  <span className="text-xs text-slate-300">
                    Ps. Boris & Meilita Manurung
                  </span>
                </div>
                <h4 className="font-serif font-bold text-xl sm:text-2xl text-white">
                  {isIndo ? 'Video Bersama Me & My Wife' : 'Videos Together: Me & My Wife'}
                </h4>
              </div>
            </div>

            <span className="text-xs text-covenant-300 bg-covenant-500/10 border border-covenant-500/20 px-3 py-1 rounded-full self-start sm:self-auto">
              {isIndo ? 'Pernikahan Kovenan & Mezbah Keluarga' : 'Covenant Marriage & Family Altar'}
            </span>
          </div>

          {/* Grid: Running Player (Left) + 2 Latest Uploads Before That (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Running Video Player */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-covenant-500/20 border border-covenant-500/40 text-covenant-300 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-covenant-400 animate-pulse" />
                  <span>
                    {activeTogetherVideo.id === together.latest.id
                      ? isIndo
                        ? 'Video Terakhir Diunggah (Running Video)'
                        : 'Latest Uploaded Video (Running)'
                      : isIndo
                      ? 'Sedang Diputar (Now Playing)'
                      : 'Now Playing'}
                  </span>
                </div>

                <span className="text-[11px] font-medium text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-md border border-white/10">
                  {activeTogetherVideo.category}
                </span>
              </div>

              {/* Embedded Player */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border border-covenant-700/60">
                <iframe
                  src={`${activeTogetherVideo.embedUrl}?autoplay=0&rel=0`}
                  title={activeTogetherVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>

              {/* Video Info & Direct YouTube link */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pt-1">
                <div className="space-y-1">
                  <h5 className="font-serif font-bold text-base sm:text-lg text-white">
                    {activeTogetherVideo.title}
                  </h5>
                  <p className="text-xs text-slate-400">
                    {isIndo
                      ? 'Klik salah satu dari 2 video di sebelah kanan untuk memutar video bersama lainnya.'
                      : 'Click either of the 2 previous videos on the right to swap into this player.'}
                  </p>
                </div>

                <a
                  href={activeTogetherVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-covenant-300 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/10 transition-colors flex-shrink-0"
                >
                  <span>{isIndo ? 'Tonton di YouTube' : 'Watch on YouTube'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 2 Latest Videos Before That */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-covenant-400" />
                  <h5 className="font-serif font-bold text-sm sm:text-base text-white">
                    {isIndo ? '2 Video Terakhir Sebelumnya' : '2 Latest Videos Before That'}
                  </h5>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {isIndo ? 'Pilih untuk memutar' : 'Click to play'}
                </span>
              </div>

              <div className="space-y-3">
                {together.previous.map((item, idx) => {
                  const isCurrent = activeTogetherVideo.id === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveTogetherVideo(item)}
                      className={`group relative p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                        isCurrent
                          ? 'bg-covenant-500/20 border-covenant-400 shadow-md ring-1 ring-covenant-400/50'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-covenant-400/50'
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className="relative w-24 h-16 sm:w-28 sm:h-18 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0 border border-white/10">
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                          <div className="w-7 h-7 rounded-full bg-covenant-600/90 text-white flex items-center justify-center shadow-xs">
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-covenant-300 uppercase tracking-wider font-semibold">
                            {isIndo ? `Upload #${idx + 2}` : `Upload #${idx + 2}`} &bull; {item.category}
                          </span>
                          {isCurrent && (
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-covenant-300 bg-covenant-500/20 px-1.5 py-0.5 rounded">
                              <CheckCircle2 className="w-2.5 h-2.5 text-covenant-300" />
                              <span>Active</span>
                            </span>
                          )}
                        </div>

                        <h6 className="font-serif font-bold text-xs sm:text-sm text-white line-clamp-2 group-hover:text-covenant-200 transition-colors leading-snug">
                          {item.title}
                        </h6>

                        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                          <span className="text-covenant-400 font-medium">
                            {isCurrent
                              ? isIndo ? 'Sedang Dimainkan' : 'Playing Now'
                              : isIndo ? 'Klik untuk memutar' : 'Click to play'}
                          </span>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-slate-400 hover:text-white p-1"
                            title="Open on YouTube"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Divider if displaying all */}
      {activeTab === 'all' && (
        <div className="border-t border-white/10 pt-4" />
      )}

      {/* 4. SHOWCASE CATEGORY 2: JUST ME / SOLO (WITH SPOKEN NARRATIVE) */}
      {(activeTab === 'all' || activeTab === 'solo') && (
        <div className="space-y-6">
          {/* Category Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-royalPurple-700/40 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-royalPurple-600/30 border border-royalPurple-500/40 flex items-center justify-center text-royalPurple-300">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-royalPurple-400 font-bold">
                    {isIndo ? 'Kategori 2' : 'Category 2'}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-royalPurple-400" />
                  <span className="text-xs text-slate-300">
                    Ps. Boris Manurung (Solo)
                  </span>
                </div>
                <h4 className="font-serif font-bold text-xl sm:text-2xl text-white">
                  {isIndo
                    ? 'Video Ps. Boris Manurung (Just Me & Others)'
                    : 'Videos: Ps. Boris Manurung (Solo & Spoken Narrative)'}
                </h4>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs text-royalPurple-300 bg-royalPurple-500/10 border border-royalPurple-500/20 px-3 py-1 rounded-full self-start sm:self-auto">
              <Quote className="w-3 h-3 text-royalPurple-400" />
              <span>{isIndo ? 'Disertai Narasi Firman yang Disampaikan' : 'Includes Spoken Word Narrative'}</span>
            </div>
          </div>

          {/* Grid: Running Player + Spoken Narrative (Left) + 2 Latest Uploads Before That (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Running Video Player & Prominent Spoken Narrative Box */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royalPurple-500/20 border border-royalPurple-500/40 text-royalPurple-300 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-royalPurple-400 animate-pulse" />
                  <span>
                    {activeSoloVideo.id === solo.latest.id
                      ? isIndo
                        ? 'Video Terakhir Diunggah (Running Video)'
                        : 'Latest Uploaded Video (Running)'
                      : isIndo
                      ? 'Sedang Diputar (Now Playing)'
                      : 'Now Playing'}
                  </span>
                </div>

                <span className="text-[11px] font-medium text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-md border border-white/10">
                  {activeSoloVideo.category}
                </span>
              </div>

              {/* Embedded Player */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border border-royalPurple-700/60">
                <iframe
                  src={`${activeSoloVideo.embedUrl}?autoplay=0&rel=0`}
                  title={activeSoloVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>

              {/* Video Title & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pt-1">
                <div className="space-y-1">
                  <h5 className="font-serif font-bold text-base sm:text-lg text-white">
                    {activeSoloVideo.title}
                  </h5>
                  <p className="text-xs text-slate-400">
                    {isIndo
                      ? 'Dengarkan video atau baca intisari narasi firman yang disampaikan di bawah.'
                      : 'Listen to the video or read the spoken narrative transcript below.'}
                  </p>
                </div>

                <a
                  href={activeSoloVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-royalPurple-300 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/10 transition-colors flex-shrink-0"
                >
                  <span>{isIndo ? 'Tonton di YouTube' : 'Watch on YouTube'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* SPOKEN NARRATIVE BOX: What is being said by Ps. Boris Manurung */}
              {activeSoloVideo.narrative && (
                <div className="mt-4 rounded-2xl bg-gradient-to-br from-royalPurple-950/70 via-slate-900 to-covenant-950 p-5 sm:p-6 border border-royalPurple-500/30 shadow-lg space-y-3">
                  <div className="flex items-center justify-between border-b border-royalPurple-500/20 pb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-royalPurple-600/30 border border-royalPurple-400/40 flex items-center justify-center text-royalPurple-300">
                        <Quote className="w-4 h-4" />
                      </div>
                      <h6 className="font-serif font-bold text-sm sm:text-base text-royalPurple-200">
                        {isIndo
                          ? 'Narasi Firman yang Disampaikan oleh Ps. Boris Manurung'
                          : 'Spoken Word Narrative by Ps. Boris Manurung'}
                      </h6>
                    </div>
                    <span className="text-[10px] font-mono text-royalPurple-300 uppercase tracking-widest bg-royalPurple-500/20 px-2 py-0.5 rounded">
                      {isIndo ? 'Intisari Pesan' : 'Transcript / Narrative'}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans italic">
                    &ldquo;{activeSoloVideo.narrative[locale] || activeSoloVideo.narrative.id}&rdquo;
                  </p>

                  <div className="text-[11px] text-royalPurple-300/80 pt-1 flex items-center justify-between">
                    <span>
                      {isIndo
                        ? '&bull; Disampaikan langsung oleh Ps. Boris Manurung'
                        : '&bull; Spoken directly by Ps. Boris Manurung'}
                    </span>
                    <a
                      href={activeSoloVideo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-1"
                    >
                      <span>{isIndo ? 'Buka Sumber Video' : 'Open Video Source'}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* 2 Latest Videos Before That */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-royalPurple-400" />
                  <h5 className="font-serif font-bold text-sm sm:text-base text-white">
                    {isIndo ? '2 Video Terakhir Sebelumnya' : '2 Latest Videos Before That'}
                  </h5>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {isIndo ? 'Pilih untuk memutar' : 'Click to play'}
                </span>
              </div>

              <div className="space-y-3">
                {solo.previous.map((item, idx) => {
                  const isCurrent = activeSoloVideo.id === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveSoloVideo(item)}
                      className={`group relative p-3 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2.5 ${
                        isCurrent
                          ? 'bg-royalPurple-500/20 border-royalPurple-400 shadow-md ring-1 ring-royalPurple-400/50'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-royalPurple-400/50'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        {/* Thumbnail */}
                        <div className="relative w-24 h-16 sm:w-28 sm:h-18 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0 border border-white/10">
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                            <div className="w-7 h-7 rounded-full bg-royalPurple-600/90 text-white flex items-center justify-center shadow-xs">
                              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                            </div>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-royalPurple-300 uppercase tracking-wider font-semibold">
                              {isIndo ? `Upload #${idx + 2}` : `Upload #${idx + 2}`} &bull; {item.category}
                            </span>
                            {isCurrent && (
                              <span className="inline-flex items-center gap-1 text-[9px] font-bold text-royalPurple-300 bg-royalPurple-500/20 px-1.5 py-0.5 rounded">
                                <CheckCircle2 className="w-2.5 h-2.5 text-royalPurple-300" />
                                <span>Active</span>
                              </span>
                            )}
                          </div>

                          <h6 className="font-serif font-bold text-xs sm:text-sm text-white line-clamp-2 group-hover:text-royalPurple-200 transition-colors leading-snug">
                            {item.title}
                          </h6>

                          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                            <span className="text-royalPurple-400 font-medium">
                              {isCurrent
                                ? isIndo ? 'Sedang Dimainkan' : 'Playing Now'
                                : isIndo ? 'Klik untuk memutar' : 'Click to play'}
                            </span>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-slate-400 hover:text-white p-1"
                              title="Open on YouTube"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Small narrative snippet preview */}
                      {item.narrative && (
                        <div className="text-[11px] text-slate-300 line-clamp-2 bg-black/20 px-2.5 py-1.5 rounded-lg border border-white/5 font-sans italic">
                          &ldquo;{item.narrative[locale] || item.narrative.id}&rdquo;
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Footer Quick Links */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 text-xs">
        <a
          href={YOUTUBE_CHANNEL.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-rose-300 hover:text-rose-200 inline-flex items-center gap-1.5 font-medium"
        >
          <span>
            {isIndo
              ? 'Kunjungi Kanal Lengkap YouTube @borismanurung2626'
              : 'Visit Full Channel @borismanurung2626 on YouTube'}
          </span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <Link
          href={`/${locale}/sermons`}
          className="text-covenant-300 hover:text-white inline-flex items-center gap-1.5 font-semibold"
        >
          <span>
            {isIndo
              ? 'Lihat Semua Video Dalam Format 2 Kolom (Bersama & Sendiri)'
              : 'Explore All Videos in 2-Column Side-by-Side Format'}
          </span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
