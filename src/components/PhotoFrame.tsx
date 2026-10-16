'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Sparkles, Maximize2, X, Heart } from 'lucide-react';
import { Locale } from '@/i18n/config';

interface PhotoFrameProps {
  src: string;
  alt: string;
  caption?: string;
  subtitle?: string;
  badge?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide' | 'auto';
  className?: string;
  priority?: boolean;
  enableModal?: boolean;
  locale?: Locale;
}

export default function PhotoFrame({
  src,
  alt,
  caption,
  subtitle,
  badge,
  aspectRatio = 'landscape',
  className = '',
  priority = false,
  enableModal = true,
  locale = 'id',
}: PhotoFrameProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const aspectClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    wide: 'aspect-[16/10]',
    auto: 'h-full min-h-[300px]',
  }[aspectRatio];

  return (
    <>
      <div
        className={`group relative rounded-3xl p-1 sm:p-1.5 bg-gradient-to-tr from-slate-300 via-slate-100 to-slate-200 shadow-xl border border-slate-300/70 transition-all duration-300 hover:shadow-2xl hover:border-covenant-300 ${className}`}
      >
        {/* Subtle Blue & Purple Royal Nuance Ring */}
        <div className="p-0.5 rounded-[22px] bg-gradient-to-tr from-covenant-600 via-indigo-500 to-royalPurple-600 transition-opacity duration-300 group-hover:from-covenant-500 group-hover:to-royalPurple-500">
          {/* Inner Platinum White Bevel */}
          <div className="p-1 sm:p-1.5 bg-white rounded-[20px] overflow-hidden">
            <div className={`relative w-full ${aspectClasses} rounded-[16px] overflow-hidden bg-slate-100`}>
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                priority={priority}
              />

              {/* Subtle silver gradient overlay at bottom for readability */}
              {(caption || subtitle) && (
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity pointer-events-none" />
              )}

              {/* Top Floating Badge */}
              {badge && (
                <div className="absolute top-3 left-3 z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 text-covenant-800 text-xs font-semibold shadow-md">
                    <Sparkles className="w-3 h-3 text-royalPurple-600" />
                    <span>{badge}</span>
                  </div>
                </div>
              )}

              {/* Expand / View Button */}
              {enableModal && (
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-covenant-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md hover:scale-110 active:scale-95"
                  aria-label={locale === 'en' ? 'Enlarge photo' : 'Perbesar foto'}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              )}

              {/* Bottom Caption */}
              {(caption || subtitle) && (
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 text-white">
                  {caption && (
                    <h4 className="font-serif font-bold text-base sm:text-lg leading-tight text-white drop-shadow-sm">
                      {caption}
                    </h4>
                  )}
                  {subtitle && (
                    <p className="text-xs sm:text-sm text-slate-200 mt-1 line-clamp-2 drop-shadow-xs">
                      {subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={caption || alt}
          className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] rounded-3xl p-2 bg-gradient-to-tr from-slate-300 via-slate-100 to-slate-200 border border-slate-300/80 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-0.5 rounded-[22px] bg-gradient-to-tr from-covenant-500 via-indigo-500 to-royalPurple-500 relative">
              {/* Floating Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-navy-950/80 hover:bg-navy-900 text-white backdrop-blur-md transition-transform hover:scale-105 active:scale-95 shadow-lg border border-white/20"
                aria-label={locale === 'en' ? 'Close' : 'Tutup'}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-1 sm:p-2 bg-white rounded-[20px] overflow-hidden">
                <div className="relative w-full h-[65vh] sm:h-[75vh] rounded-[16px] overflow-hidden bg-slate-900">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {(caption || subtitle) && (
                  <div className="p-4 sm:p-5 border-t border-slate-100">
                    {caption && (
                      <h3 className="font-serif font-bold text-lg text-slate-900">
                        {caption}
                      </h3>
                    )}
                    {subtitle && (
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                        {subtitle}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
