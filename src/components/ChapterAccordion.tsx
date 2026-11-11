"use client";

import { useState } from 'react';
import { ChevronDown, Quote, BookOpen, HelpCircle, Sparkles, Heart } from 'lucide-react';

export interface QuoteItem {
  text: string;
  source?: string;
}

export interface ScriptureItem {
  ref: string;
  text: string;
}

export interface Chapter {
  id: number;
  sessionNumber?: string;
  title: string;
  title_id?: string;
  title_en?: string;
  theme_id?: string;
  theme_en?: string;
  summary_id: string;
  summary_en: string;
  quotes?: QuoteItem[];
  key_scriptures?: ScriptureItem[];
  reflection_questions_id?: string[];
  reflection_questions_en?: string[];
}

function renderWithLinks(text: string) {
  if (!text) return null;
  const parts = text.split(/(https:\/\/2equal1\.com\/?)/g);
  return parts.map((part, i) => {
    if (part === 'https://2equal1.com/' || part === 'https://2equal1.com') {
      return (
        <a
          key={i}
          href="https://2equal1.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-covenant-600 hover:text-covenant-800 underline font-medium inline-block"
          onClick={(e) => e.stopPropagation()}
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

export default function ChapterAccordion({
  chapter,
  locale,
  defaultOpen = false,
}: {
  chapter: Chapter;
  locale: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const isEn = locale.startsWith('en');

  const title = (isEn ? chapter.title_en : chapter.title_id) || chapter.title;
  const theme = isEn ? chapter.theme_en : chapter.theme_id;
  const summary = isEn ? chapter.summary_en : chapter.summary_id;
  const reflectionQuestions = isEn ? chapter.reflection_questions_en : chapter.reflection_questions_id;

  // Split summary into paragraphs
  const paragraphs = summary ? summary.split('\n\n').filter((p) => p.trim().length > 0) : [];

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-300 shadow-sm ${
        open
          ? 'border-covenant-400 bg-white shadow-md ring-1 ring-covenant-200'
          : 'border-slate-200/80 bg-white hover:border-covenant-300'
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full text-left px-5 py-4 transition-colors flex items-center justify-between gap-4 ${
          open ? 'bg-gradient-to-r from-covenant-50 via-white to-royalPurple-50/30' : 'hover:bg-slate-50/80'
        }`}
        aria-expanded={open}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
          {chapter.sessionNumber && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-covenant-100 text-covenant-800 border border-covenant-200 w-fit shrink-0">
              {chapter.sessionNumber}
            </span>
          )}
          <div className="min-w-0">
            <h3 className="font-semibold text-base sm:text-lg text-slate-900 tracking-tight leading-snug">
              {title}
            </h3>
            {theme && (
              <p className="text-xs sm:text-sm text-slate-500 font-normal line-clamp-1 mt-0.5">
                {theme}
              </p>
            )}
          </div>
        </div>

        <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 transition-transform duration-300">
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180 text-covenant-600' : ''}`} />
        </div>
      </button>

      {open && (
        <div className="px-5 py-6 space-y-6 border-t border-slate-100 bg-white">
          {/* Executive Summary */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-covenant-900 font-semibold text-sm uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-covenant-600" />
              <span>{isEn ? 'Executive Summary' : 'Executive Summary & Intisari Pengajaran'}</span>
            </div>
            <div className="space-y-3 text-slate-700 leading-relaxed text-sm sm:text-base">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="text-justify">
                  {renderWithLinks(p)}
                </p>
              ))}
            </div>
          </div>

          {/* Quotes Section */}
          {chapter.quotes && chapter.quotes.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-royalPurple-900 font-semibold text-sm uppercase tracking-wider">
                <Quote className="w-4 h-4 text-royalPurple-600" />
                <span>{isEn ? 'Key Quotes' : 'Kutipan Kunci (Quotes)'}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {chapter.quotes.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-gradient-to-br from-royalPurple-50/50 via-white to-covenant-50/30 border border-royalPurple-100/80 flex flex-col justify-between"
                  >
                    <blockquote className="text-xs sm:text-sm italic text-slate-800 leading-snug">
                      &ldquo;{renderWithLinks(q.text)}&rdquo;
                    </blockquote>
                    {q.source && (
                      <p className="mt-2 text-[11px] font-medium text-royalPurple-700 text-right">
                        — {renderWithLinks(q.source)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Scriptures Section */}
          {chapter.key_scriptures && chapter.key_scriptures.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-covenant-900 font-semibold text-sm uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-covenant-600" />
                <span>{isEn ? 'Scripture Foundation' : 'Landasan Firman Tuhan'}</span>
              </div>
              <div className="space-y-2">
                {chapter.key_scriptures.map((scr, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-50 border-l-4 border-covenant-500 text-xs sm:text-sm text-slate-700"
                  >
                    <span className="font-semibold text-covenant-800 mr-2">{scr.ref}:</span>
                    <span className="italic">{scr.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reflection Questions Section */}
          {reflectionQuestions && reflectionQuestions.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>{isEn ? 'Reflection & Transformation Questions' : 'Pertanyaan Refleksi & Pemulihan'}</span>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50/60 via-amber-50/30 to-orange-50/40 border border-amber-200/80 space-y-3">
                <p className="text-xs font-medium text-amber-800 italic flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  {isEn
                    ? 'Take time together as husband and wife to reflect, discuss openly, and invite God’s transformation:'
                    : 'Luangkan waktu berdua sebagai suami dan isteri untuk merenungkan, berdiskusi dengan jujur, dan mengundang pemulihan Tuhan:'}
                </p>
                <ol className="space-y-2.5 list-none pl-0">
                  {reflectionQuestions.map((q, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{renderWithLinks(q)}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
