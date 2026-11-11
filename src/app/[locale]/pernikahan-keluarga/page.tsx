import { Locale } from '@/i18n/config';
import chapters from '@/data/chapters_summary.json';
import { ArrowLeft, Sparkles, BookOpen, Users, ShieldCheck, HeartHandshake } from 'lucide-react';
import { getDictionary } from '@/i18n/getDictionary';
import Link from 'next/link';
import ChapterAccordion, { Chapter } from '@/components/ChapterAccordion';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const isEn = locale.startsWith('en');
  return {
    title: isEn
      ? '2=1 Ministry - Married For Life Executive Summaries | Our Covenant Love'
      : '2=1 Ministry - Executive Summary Married For Life | Our Covenant Love',
    description: isEn
      ? 'Executive summaries of the 13 Married For Life curriculum sessions, including key quotes, scriptures, and reflection questions for marital transformation.'
      : 'Rangkuman eksekutif dari 13 sesi materi kelas pernikahan Married For Life (2=1 Ministry), dilengkapi quotes, firman kunci, dan pertanyaan refleksi untuk pemulihan pernikahan.',
  };
}

export default async function PernikahanKeluargaPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const isEn = locale.startsWith('en');
  const dict: any = getDictionary(locale);

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Back */}
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-covenant-700 hover:text-covenant-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {dict.common?.backToList ?? (isEn ? 'Back to Home' : 'Kembali')}
        </Link>

        {/* Hero Header */}
        <div className="bg-gradient-to-br from-covenant-900 via-navy-900 to-royalPurple-950 rounded-2xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-covenant-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-royalPurple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs font-medium text-covenant-200">
              <Sparkles className="w-3.5 h-3.5 text-covenant-300" />
              <span>2=1 Marriage For Life Ministry</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {isEn ? 'Married For Life Course' : 'Materi Sesi Kelas Married For Life'}
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              {isEn
                ? 'Executive summaries for all 13 sessions of the Married For Life curriculum. Each session features biblical insights, key quotes, foundational scriptures, and heart-searching reflection questions designed to prompt deep discussion and marital transformation.'
                : 'Executive summary lengkap dari 13 sesi materi kelas pernikahan Married For Life (2=1 Ministry). Setiap sesi memuat intisari pengajaran alkitabiah, kutipan kunci (quotes), landasan firman Tuhan, serta pertanyaan-pertanyaan refleksi untuk memicu pasutri merenung, bertransformasi, dan memulihkan rumah tangga.'}
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <BookOpen className="w-4 h-4 text-covenant-300 shrink-0" />
                <span>{isEn ? '13 In-Depth Sessions' : '13 Sesi Pembinaan Terstruktur'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-covenant-300 shrink-0" />
                <span>{isEn ? 'Biblical Covenant Model' : 'Berlandaskan Perjanjian Ilahi'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <HeartHandshake className="w-4 h-4 text-covenant-300 shrink-0" />
                <span>{isEn ? 'Personal & Couple Reflection' : 'Refleksi Mandiri & Pasangan'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {isEn ? 'Course Sessions & Executive Summaries' : 'Daftar Sesi & Executive Summary'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                {isEn
                  ? 'Click on any session below to view its executive summary, key quotes, scriptures, and reflection questions.'
                  : 'Klik pada setiap sesi di bawah untuk membuka executive summary, quotes, ayat Alkitab, dan pertanyaan refleksi.'}
              </p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-covenant-50 text-covenant-700 border border-covenant-200 w-fit">
              {chapters.length} {isEn ? 'Sessions Total' : 'Sesi Lengkap'}
            </span>
          </div>

          <div className="space-y-3.5">
            {(chapters as Chapter[]).map((ch: Chapter, index: number) => (
              <ChapterAccordion
                key={ch.id}
                chapter={ch}
                locale={locale}
                defaultOpen={index === 0}
              />
            ))}
          </div>
        </div>

        {/* Callout Box / Encouragement */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-covenant-50 via-white to-royalPurple-50 border border-covenant-100 shadow-sm text-center space-y-3">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-covenant-100 text-covenant-700 mx-auto">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            {isEn
              ? 'Longing to experience a restored, powerhouse marriage?'
              : 'Rindu mengalami pemulihan dan terobosan dalam pernikahan?'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            {isEn
              ? 'Classes are held in small, intimate groups hosted in homes, led by certified coaching couples. Discover God’s original blueprint and watch your home become an oasis for your community.'
              : 'Kelas Married For Life diadakan dalam kelompok kecil di rumah-rumah pasutri fasilitator untuk menciptakan suasana hangat, aman, dan penuh transparansi. Temukan rancangan ilahi Allah dan jadikan rumah tanggamu oasis bagi dunia.'}
          </p>
          <div className="pt-2">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-covenant-600 hover:bg-covenant-700 text-white font-medium text-xs sm:text-sm shadow-sm transition-colors"
            >
              {isEn ? 'Connect with 2=1 Ministry' : 'Hubungi Kami untuk Info Kelas'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
