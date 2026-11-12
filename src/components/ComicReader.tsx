'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Columns,
  ListFilter,
  Sparkles,
  BookOpen,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import ComicReaderModal from './ComicReaderModal';
import { Locale } from '@/i18n/config';

export interface ComicReaderProps {
  title: string;
  excerpt?: string | null;
  scriptureRef?: string | null;
  images: string[];
  articleSlug: string;
  locale: Locale;
}

export default function ComicReader({
  title,
  excerpt,
  scriptureRef,
  images,
  articleSlug,
  locale,
}: ComicReaderProps) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'slide' | 'scroll'>('slide');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const totalPages = images.length;
  const isId = locale === 'id';

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden my-8">
      {/* Viewer Header / Toolbar */}
      <div className="px-4 sm:px-6 py-4 bg-slate-950/80 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        {/* Left Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{isId ? 'Rentetan Komik Dialog' : 'Comic Dialogue Strip'}</span>
          </span>
          <span className="text-xs text-slate-400 font-medium">
            ({totalPages} {isId ? 'Halaman' : 'Pages'})
          </span>
        </div>

        {/* Right Toolbar Controls */}
        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="inline-flex bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
            <button
              type="button"
              onClick={() => {
                setViewMode('slide');
                setIsZoomed(false);
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md font-medium transition-colors ${
                viewMode === 'slide'
                  ? 'bg-covenant-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={isId ? 'Mode Per Halaman' : 'Slide Mode'}
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isId ? 'Per Halaman' : 'Slide'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode('scroll');
                setIsZoomed(false);
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md font-medium transition-colors ${
                viewMode === 'scroll'
                  ? 'bg-covenant-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={isId ? 'Mode Gulir Vertikal' : 'Continuous Scroll Mode'}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isId ? 'Gulir Vertikal' : 'Scroll'}</span>
            </button>
          </div>

          {/* Fullscreen Modal Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            title={isId ? 'Buka Layar Penuh' : 'Open Fullscreen Reader'}
          >
            <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{isId ? 'Layar Penuh' : 'Fullscreen'}</span>
          </button>
        </div>
      </div>

      {/* Main Display Area */}
      <div className="p-4 sm:p-6 bg-slate-950/40">
        {viewMode === 'slide' ? (
          /* SLIDE VIEW */
          <div className="space-y-4">
            <div className="relative flex items-center justify-center min-h-[480px] sm:min-h-[580px] bg-slate-950/70 rounded-2xl p-2 sm:p-4 border border-slate-800/80">
              {/* Prev Button */}
              <button
                type="button"
                onClick={() => {
                  setCurrentPage((prev) => Math.max(prev - 1, 0));
                  setIsZoomed(false);
                }}
                disabled={currentPage === 0}
                className={`absolute left-2 sm:left-4 z-10 p-2 sm:p-3 rounded-full bg-slate-900/85 hover:bg-covenant-800 text-white border border-slate-700 shadow-xl transition-all ${
                  currentPage === 0
                    ? 'opacity-30 cursor-not-allowed'
                    : 'opacity-85 hover:opacity-100 hover:scale-105'
                }`}
                title={isId ? 'Halaman Sebelumnya' : 'Previous'}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Current Image */}
              <div
                className={`relative transition-transform duration-200 cursor-pointer ${
                  isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed((prev) => !prev)}
                title={isId ? 'Klik untuk memperbesar / membuka layar penuh' : 'Click to zoom'}
              >
                <img
                  src={images[currentPage]}
                  alt={`${title} - ${isId ? 'Halaman' : 'Page'} ${currentPage + 1}`}
                  className="max-h-[70vh] sm:max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-slate-800"
                />
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => {
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
                  setIsZoomed(false);
                }}
                disabled={currentPage === totalPages - 1}
                className={`absolute right-2 sm:right-4 z-10 p-2 sm:p-3 rounded-full bg-slate-900/85 hover:bg-covenant-800 text-white border border-slate-700 shadow-xl transition-all ${
                  currentPage === totalPages - 1
                    ? 'opacity-30 cursor-not-allowed'
                    : 'opacity-85 hover:opacity-100 hover:scale-105'
                }`}
                title={isId ? 'Halaman Berikutnya' : 'Next'}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Pagination and Thumbnails Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-xs sm:text-sm font-medium text-slate-300">
                {isId ? 'Halaman' : 'Page'}{' '}
                <span className="text-amber-400 font-bold">{currentPage + 1}</span>{' '}
                {isId ? 'dari' : 'of'} <span className="font-bold">{totalPages}</span>
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
                {images.map((img, idx) => (
                  <button
                    key={img + idx}
                    type="button"
                    onClick={() => {
                      setCurrentPage(idx);
                      setIsZoomed(false);
                    }}
                    className={`relative w-10 sm:w-12 h-14 rounded-lg overflow-hidden border transition-all flex-shrink-0 ${
                      currentPage === idx
                        ? 'border-amber-400 ring-2 ring-amber-400/50 scale-105 shadow-md'
                        : 'border-slate-700 opacity-60 hover:opacity-100'
                    }`}
                    title={`${isId ? 'Halaman' : 'Page'} ${idx + 1}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* VERTICAL CONTINUOUS SCROLL */
          <div className="space-y-8 flex flex-col items-center">
            {images.map((img, idx) => (
              <div
                key={img + idx}
                className="w-full max-w-2xl bg-slate-950/80 p-2 sm:p-3 rounded-2xl border border-slate-800 shadow-xl space-y-2"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 px-2 font-mono">
                  <span>
                    {isId ? 'Halaman' : 'Page'} {idx + 1} / {totalPages}
                  </span>
                  <span className="text-amber-400/80">Our Covenant Love</span>
                </div>
                <img
                  src={img}
                  alt={`${title} - ${idx + 1}`}
                  className="w-full h-auto rounded-xl shadow border border-slate-800"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox / Fullscreen Modal */}
      <ComicReaderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        excerpt={excerpt}
        scriptureRef={scriptureRef}
        images={images}
        articleSlug={articleSlug}
        locale={locale}
        initialPage={currentPage}
      />
    </div>
  );
}
