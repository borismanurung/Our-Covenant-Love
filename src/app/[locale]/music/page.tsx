import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { Music, Sparkles } from 'lucide-react';
import PhotoFrame from '@/components/PhotoFrame';
import MusicShowcase from '@/components/MusicShowcase';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return {
    title: `${dict.music.title} | Our Covenant Love`,
    description: dict.music.subtitle,
  };
}

export default async function MusicPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header with Family Worship Nuance Visual */}
      <div className="bg-gradient-to-b from-covenant-50/70 via-white to-slate-50/50 rounded-3xl p-6 sm:p-10 border border-covenant-200/80 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-covenant-100 border border-covenant-300 text-covenant-900 text-xs font-semibold uppercase tracking-wider">
              <Music className="w-3.5 h-3.5 text-covenant-600" />
              <span>{locale === 'id' ? 'Lagu Perjanjian & Penyembahan' : 'Covenant Worship & Songs'}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
              {dict.music.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
              {dict.music.subtitle}
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-xs">
              <PhotoFrame
                src="/images/family/children-blue-purple.jpg"
                alt={locale === 'id' ? 'Pujian & Penyembahan Keluarga' : 'Family Praise & Worship'}
                aspectRatio="portrait"
                locale={locale}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Music & Video Showcase */}
      <MusicShowcase locale={locale} dict={dict} />
    </div>
  );
}
