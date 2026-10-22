"use client";

import { useState } from 'react';

interface Chapter {
  id: number;
  title: string;
  summary_en: string;
  summary_id: string;
}

export default function ChapterAccordion({ chapter, locale }: { chapter: Chapter; locale: string }) {
  const [open, setOpen] = useState(false);
  const summary = locale.startsWith('en') ? chapter.summary_en : chapter.summary_id;

  return (
    <div className="border border-covenant-200/30 rounded-lg overflow-hidden mb-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 bg-covenant-50 hover:bg-covenant-100 transition-colors flex justify-between items-center"
      >
        <span className="font-medium text-slate-800">{chapter.title}</span>
        <span className={`transform transition-transform ${open ? 'rotate-180' : ''}`}>&darr;</span>
      </button>
      {open && (
        <div className="px-4 py-3 bg-white border-t border-covenant-200/30">
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{summary}</p>
        </div>
      )}
    </div>
  );
}
