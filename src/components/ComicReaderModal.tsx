'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Columns,
  ListFilter,
  BookOpen,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { Locale } from '@/i18n/config';

export interface ComicReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  excerpt?: string | null;
  scriptureRef?: string | null;
  images: string[];
  articleSlug?: string;
  locale: Locale;
  initialPage?: number;
}

export default function ComicReaderModal({
  isOpen,
  onClose,
  title,
  excerpt,
  scriptureRef,
  images,
  articleSlug,
  locale,
  initialPage = 0,
}: ComicReaderModalProps) {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [viewMode, setViewMode] = useState<'slide' | 'scroll'>('slide');
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const totalPages = images.length;

  // Reset page when opening modal with new initialPage
  useEffect(() => {
    if (isOpen) {
      setCurrentPage(Math.min(Math.max(0, initialPage), totalPages - 1));
      setIsZoomed(false);
      // Prevent background body scrolling while modal is active
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialPage, totalPages]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (viewMode === 'slide') {
          setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
          setIsZoomed(false);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (viewMode === 'slide') {
          setCurrentPage((prev) => Math.max(prev - 1, 0));
          setIsZoomed(false);
        }
      }
    },
    [isOpen, isZoomed, onClose, viewMode, totalPages]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalContainerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const isId = locale === 'id';

  if (!isOpen) return null;

  return (
    <div
      ref={modalContainerRef}
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-md text-white select-none transition-all duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Top Header Bar */}
      <header className="flex-none px-4 sm:px-6 py-3 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between gap-4">
        {/* Title and Scripture Reference */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {isId ? 'Komik Dialog' : 'Comic Dialogue'}
              </span>
              {scriptureRef && (
                <span className="hidden md:inline-block text-[11px] text-slate-400 truncate">
                  &ldquo;{scriptureRef}&rdquo;
                </span>
              )}
            </div>
            <h2 className="font-serif text-sm sm:text-base font-bold text-white truncate max-w-md sm:max-w-xl">
              {title}
            </h2>
          </div>
        </div>

        {/* Controls Toolbar */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* View Mode Toggle: Slide vs Continuous Scroll */}
          <div className="hidden sm:inline-flex bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
            <button
              type="button"
              onClick={() => {
                setViewMode('slide');
                setIsZoomed(false);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
                viewMode === 'slide'
                  ? 'bg-covenant-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={isId ? 'Mode Per Halaman (Slide)' : 'Page-by-page Slide Mode'}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>{isId ? 'Per Halaman' : 'Slide'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode('scroll');
                setIsZoomed(false);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
                viewMode === 'scroll'
                  ? 'bg-covenant-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={isId ? 'Mode Gulir Vertikal (Webtoon)' : 'Continuous Scroll Mode'}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>{isId ? 'Gulir Vertikal' : 'Scroll'}</span>
            </button>
          </div>

          {/* Zoom toggle (in slide mode) */}
          {viewMode === 'slide' && (
            <button
              type="button"
              onClick={() => setIsZoomed((prev) => !prev)}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title={isZoomed ? (isId ? 'Perkecil' : 'Zoom Out') : (isId ? 'Perbesar' : 'Zoom In')}
            >
              {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            </button>
          )}

          {/* Fullscreen toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 sm:p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title={isId ? 'Layar Penuh' : 'Toggle Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 bg-slate-800 hover:bg-red-950/70 hover:text-red-400 text-slate-300 rounded-lg border border-slate-700 hover:border-red-800 transition-colors"
            title={isId ? 'Tutup (Esc)' : 'Close (Esc)'}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Reader Stage */}
      <main className="flex-1 relative overflow-hidden flex items-center justify-center p-2 sm:p-4">
        {viewMode === 'slide' ? (
          /* SLIDE MODE: Single page with next/prev and zoom */
          <div className="relative w-full h-full flex items-center justify-center overflow-auto">
            {/* Previous Page Button */}
            <button
              type="button"
              onClick={() => {
                setCurrentPage((prev) => Math.max(prev - 1, 0));
                setIsZoomed(false);
              }}
              disabled={currentPage === 0}
              className={`absolute left-2 sm:left-4 z-20 p-2 sm:p-3 rounded-full bg-slate-900/80 hover:bg-covenant-800 border border-slate-700/80 text-white shadow-xl transition-all ${
                currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-85 hover:opacity-100 hover:scale-105'
              }`}
              title={isId ? 'Halaman Sebelumnya' : 'Previous Page'}
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Current Comic Image */}
            <div
              className={`relative flex items-center justify-center transition-transform duration-200 cursor-pointer ${
                isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed((prev) => !prev)}
              title={isId ? 'Klik untuk memperbesar/memperkecil' : 'Click to zoom'}
            >
              <img
                src={images[currentPage]}
                alt={`${title} - ${isId ? 'Halaman' : 'Page'} ${currentPage + 1}`}
                className="max-h-[76vh] sm:max-h-[80vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-slate-800"
                loading="eager"
              />
            </div>

            {/* Next Page Button */}
            <button
              type="button"
              onClick={() => {
                setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
                setIsZoomed(false);
              }}
              disabled={currentPage === totalPages - 1}
              className={`absolute right-2 sm:right-4 z-20 p-2 sm:p-3 rounded-full bg-slate-900/80 hover:bg-covenant-800 border border-slate-700/80 text-white shadow-xl transition-all ${
                currentPage === totalPages - 1
                  ? 'opacity-30 cursor-not-allowed'
                  : 'opacity-85 hover:opacity-100 hover:scale-105'
              }`}
              title={isId ? 'Halaman Berikutnya' : 'Next Page'}
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>
        ) : (
          /* SCROLL MODE: Continuous vertical reading */
          <div
            ref={scrollContainerRef}
            className="w-full h-full overflow-y-auto space-y-6 py-4 flex flex-col items-center px-2"
          >
            {images.map((imgSrc, index) => (
              <div
                key={imgSrc + index}
                className="w-full max-w-2xl bg-slate-900/60 p-2 sm:p-3 rounded-2xl border border-slate-800/80 shadow-2xl space-y-2"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 px-2 pt-1 font-mono">
                  <span>
                    {isId ? 'Halaman' : 'Page'} {index + 1} / {totalPages}
                  </span>
                  <span className="text-[11px] text-amber-400/80 font-serif">Our Covenant Love</span>
                </div>
                <img
                  src={imgSrc}
                  alt={`${title} - ${index + 1}`}
                  className="w-full h-auto rounded-xl shadow-md border border-slate-800"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Bottom Footer Bar */}
      <footer className="flex-none px-4 sm:px-6 py-3 bg-slate-900/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {/* Page status or jump to thumbnails */}
        <div className="flex items-center gap-3">
          {viewMode === 'slide' ? (
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold text-slate-300">
                {isId ? 'Halaman' : 'Page'}{' '}
                <span className="text-amber-400 font-bold">{currentPage + 1}</span> / {totalPages}
              </span>

              {/* Mini thumbnails strip */}
              <div className="hidden md:flex items-center gap-1.5 ml-3">
                {images.map((img, i) => (
                  <button
                    key={img + i}
                    type="button"
                    onClick={() => {
                      setCurrentPage(i);
                      setIsZoomed(false);
                    }}
                    className={`relative w-8 h-10 rounded border overflow-hidden transition-all ${
                      currentPage === i
                        ? 'border-amber-400 ring-2 ring-amber-400/50 scale-105'
                        : 'border-slate-700 opacity-60 hover:opacity-100'
                    }`}
                    title={`${isId ? 'Halaman' : 'Page'} ${i + 1}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400">
              {isId ? `Total ${totalPages} Halaman Komik` : `Total ${totalPages} Comic Pages`}
            </div>
          )}
        </div>

        {/* Action: Open Full Article / Reflection */}
        {articleSlug && (
          <Link
            href={`/${locale}/articles/${articleSlug}`}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-covenant-700 hover:bg-covenant-600 text-white transition-colors shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isId ? 'Buka Renungan & Naskah Lengkap' : 'Read Full Devotional & Notes'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </footer>
    </div>
  );
}
