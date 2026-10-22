import { Locale } from '@/i18n/config';
import chapters from '@/data/chapters_summary.json';
import { ArrowLeft } from 'lucide-react';
import { getDictionary } from '@/i18n/getDictionary';
import Link from 'next/link';
import ChapterAccordion from '@/components/ChapterAccordion';

interface Chapter {
  id: number;
  title: string;
  summary_en: string;
  summary_id: string;
}


export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  return {
    title: `${dict.common.pernikahanKeluarga || 'Pernikahan & Keluarga'} | Our Covenant Love`,
    description: dict.music.storyTitle,
  };
}

export default function PernikahanKeluargaPage({ params }: { params: { locale: Locale } }) {
  const subHeading = '2=1 Marriage For Life Ministry';
  const dict = getDictionary(params.locale);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <Link
        href={`/${params.locale}`}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-covenant-700 hover:text-covenant-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {dict.common.backToList ?? 'Back'}
      </Link>

      <h1 className="text-3xl font-bold text-slate-900">2=1 Marriage For Life</h1>
      <p className="text-lg text-slate-700">
        {dict.common.pernikahanKeluargaIntro ?? 'Ringkasan pelayanan 2=1 dan kelas Marriage For Life'}
      </p>

      <div className="flex items-center gap-4 mt-6 mb-4">
        <h2 className="text-2xl font-semibold text-slate-800">{subHeading}</h2>
      </div>

      <div className="space-y-4">
        {chapters.map((ch: Chapter) => (
          <ChapterAccordion key={ch.id} chapter={ch} locale={params.locale} />
        ))}
      </div>
    </div>
  );
}
