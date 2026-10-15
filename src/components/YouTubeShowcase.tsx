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
  Share2,
} from 'lucide-react';

interface YouTubeShowcaseProps {
  locale: Locale;
  videos: YouTubeVideoItem[];
}

export default function YouTubeShowcase({
  locale,
  videos,
}: YouTubeShowcaseProps) {
  // The first video is the last uploaded video
  const latestVideo = videos && videos.length > 0 ? videos[0] : null;
  const [activeVideo, setActiveVideo] = useState<YouTubeVideoItem | null>(latestVideo);

  if (!latestVideo || !activeVideo) {
    return null;
  }

  // The 3 next videos uploaded to the channel
  const threeLastUploadedVideos = videos.slice(1, 4);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-covenant-950 to-navy-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-8">
      {/* 1. Channel Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          {/* YouTube Red Icon Badge */}
          <div className="w-12 h-12 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
            <Tv className="w-6 h-6" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-white tracking-tight">
                {YOUTUBE_CHANNEL.title}
              </h3>
              <span className="text-xs font-mono text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full font-semibold">
                {YOUTUBE_CHANNEL.handle}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              {locale === 'id'
                ? 'Pengajaran, renungan singkat, & hikmat kovenan pernikahan terkini'
                : 'Latest covenant marriage teachings, wisdom & reflection videos'}
            </p>
          </div>
        </div>

        {/* Subscribe / View Channel Button */}
        <div className="flex items-center gap-3">
          <a
            href={YOUTUBE_CHANNEL.subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-rose-600/30"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{locale === 'id' ? 'Subscribe di YouTube' : 'Subscribe on YouTube'}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-75" />
          </a>
        </div>
      </div>

      {/* 2. Main Grid: Running Video (Left) + 3 Last Uploaded Videos (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Main Running Video Player (Last Uploaded or Selected) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>
                {activeVideo.id === latestVideo.id
                  ? locale === 'id'
                    ? 'Video Terakhir Diunggah (Running Video)'
                    : 'Latest Uploaded Video (Running)'
                  : locale === 'id'
                  ? 'Sedang Diputar (Now Playing)'
                  : 'Now Playing'}
              </span>
            </div>

            {activeVideo.category && (
              <span className="text-[11px] font-medium text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-md border border-white/10">
                {activeVideo.category}
              </span>
            )}
          </div>

          {/* Embedded Video Player Container */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border border-slate-700/60">
            <iframe
              src={`${activeVideo.embedUrl}?autoplay=0&rel=0`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>

          {/* Video Title & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-lg sm:text-xl text-white">
                {activeVideo.title}
              </h4>
              <p className="text-xs text-slate-400">
                {locale === 'id'
                  ? 'Klik video di daftar sebelah kanan untuk memutar video lainnya secara langsung.'
                  : 'Click any video from the list on the right to swap into this player.'}
              </p>
            </div>

            <a
              href={activeVideo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-300 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/10 transition-colors flex-shrink-0"
            >
              <span>{locale === 'id' ? 'Tonton di YouTube' : 'Watch on YouTube'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Space for Three (3) Last Uploaded Videos */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-covenant-400" />
              <h4 className="font-serif font-bold text-base text-white">
                {locale === 'id' ? '3 Video Terakhir Diunggah' : '3 Last Uploaded Videos'}
              </h4>
            </div>
            <span className="text-[11px] text-slate-400">
              {locale === 'id' ? 'Pilih untuk memutar' : 'Select to play'}
            </span>
          </div>

          <div className="space-y-3">
            {threeLastUploadedVideos.map((item, idx) => {
              const isCurrentlyActive = activeVideo.id === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveVideo(item)}
                  className={`group relative p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                    isCurrentlyActive
                      ? 'bg-rose-500/15 border-rose-500/60 shadow-md ring-1 ring-rose-500/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-covenant-400/50'
                  }`}
                >
                  {/* Video Thumbnail with Play Button */}
                  <div className="relative w-24 h-16 sm:w-28 sm:h-18 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0 border border-white/10">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                      <div className="w-7 h-7 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-xs">
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Video Details */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-covenant-300 uppercase tracking-wider font-semibold">
                        #{idx + 2} &bull; {item.category || (item.isShort ? 'Shorts' : 'Video')}
                      </span>
                      {isCurrentlyActive && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-rose-300 bg-rose-500/20 px-1.5 py-0.2 rounded">
                          <CheckCircle2 className="w-2.5 h-2.5 text-rose-400" />
                          <span>Active</span>
                        </span>
                      )}
                    </div>

                    <h5 className="font-serif font-bold text-xs sm:text-sm text-white line-clamp-2 group-hover:text-covenant-200 transition-colors leading-snug">
                      {item.title}
                    </h5>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                      <span className="text-covenant-400 font-medium">
                        {isCurrentlyActive
                          ? locale === 'id' ? 'Sedang Dimainkan' : 'Playing Now'
                          : locale === 'id' ? 'Klik untuk memutar' : 'Click to play'}
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

          {/* Quick link to see all sermons / channel */}
          <div className="pt-2 flex items-center justify-between text-xs">
            <a
              href={YOUTUBE_CHANNEL.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-300 hover:text-rose-200 inline-flex items-center gap-1.5 font-medium"
            >
              <span>{locale === 'id' ? 'Kunjungi Channel @borismanurung2626' : 'Visit @borismanurung2626 Channel'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
