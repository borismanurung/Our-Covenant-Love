import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Heart, Sparkles, BookOpen, ArrowRight } from 'lucide-react';

export default async function OurStoryPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const dict = getDictionary(locale);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* 1. Header & Vision Statement */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-covenant-100 border border-covenant-300 text-covenant-900 text-xs font-semibold uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 text-covenant-600 fill-current" />
          <span>Kisah & Kesaksian Anugerah / Our Covenant Story</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
          {dict.ourStory.title}
        </h1>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
          {dict.ourStory.subtitle}
        </p>
      </div>

      {/* 2. Visual / Founders Graphic */}
      <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden border border-covenant-200 shadow-md bg-covenant-100 flex items-center justify-center">
        <Image
          src="/images/infographic.png"
          alt="Our Covenant Love Ministry Infographic"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent flex items-end p-6 sm:p-10">
          <div className="text-white">
            <div className="font-serif italic text-base sm:text-xl text-covenant-200">
              &ldquo;{dict.common.motto}&rdquo;
            </div>
            <div className="text-xs uppercase tracking-widest text-covenant-300 mt-1 font-semibold">
              Our Covenant Love &bull; Serpong, Indonesia
            </div>
          </div>
        </div>
      </div>

      {/* 3. Founders' Burden & Theological Foundation */}
      <div className="prose prose-slate max-w-none bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 border-b border-covenant-200 pb-3">
          {dict.ourStory.foundersTitle}
        </h2>

        <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
          Ketika Tuhan memanggil dan mempertemukan kami dalam kovenan pernikahan, kami tidak pernah menyangka bahwa perjalanan ini akan menjadi sekolah iman yang paling intensif dalam hidup kami. Di dalam pernikahan, kami melihat betapa ego manusia begitu rapuh, betapa mudahnya luka terjadi, dan betapa kita sangat membutuhkan anugerah salib Kristus setiap hari.
        </p>

        <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
          Melalui musim-musim pembentukan, pengampunan, pemulihan komunikasi, dan pembaruan komitmen, Tuhan menaruh sebuah beban kudus di dalam hati kami: **Pernikahan bukan sekadar tentang mengejar kebahagiaan dua orang. Pernikahan adalah mahakarya Allah yang dirancang untuk memantulkan gambar dan kemuliaan-Nya.**
        </p>

        <div className="bg-covenant-50 p-6 rounded-2xl border border-covenant-200 my-6">
          <h3 className="font-serif font-bold text-lg text-covenant-900 mb-2">
            {dict.ourStory.biblicalFoundationTitle}
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            {dict.ourStory.biblicalFoundationText}
          </p>
        </div>
      </div>

      {/* 4. Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-covenant-200 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-covenant-100 flex items-center justify-center text-covenant-800 font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
            {dict.ourStory.visionTitle}
          </h3>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {dict.ourStory.visionText}
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-covenant-200 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-covenant-100 flex items-center justify-center text-covenant-800 font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
            {dict.ourStory.missionTitle}
          </h3>
          <ul className="space-y-3">
            {dict.ourStory.missionPoints.map((point, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-slate-700">
                <span className="font-semibold text-slate-900 block">{point.title}</span>
                <span className="text-slate-600">{point.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 5. Core Values (I-M-A-G-E) */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {dict.ourStory.valuesTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Nilai-nilai alkitabiah yang menjadi pegangan kami dalam membina keluarga dan melayani jemaat.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {dict.ourStory.values.map((v) => (
            <div
              key={v.letter}
              className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-2"
            >
              <div className="w-10 h-10 rounded-lg bg-covenant-100 text-covenant-900 font-serif font-bold text-xl flex items-center justify-center">
                {v.letter}
              </div>
              <h4 className="font-serif font-bold text-sm text-slate-900">{v.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Ministry Declaration */}
      <div className="bg-gradient-to-br from-covenant-900 to-navy-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-6">
        <span className="text-xs font-semibold tracking-widest uppercase text-covenant-300">
          Ikrar Bersama / Covenant Commitment
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-covenant-100">
          {dict.ourStory.declarationTitle}
        </h3>
        <blockquote className="font-serif italic text-base sm:text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed">
          &ldquo;{dict.ourStory.declarationText}&rdquo;
        </blockquote>

        <div className="pt-4">
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-covenant-500 hover:bg-covenant-400 text-covenant-950 font-bold text-sm transition-colors shadow-md"
          >
            <span>{dict.common.contact}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
