import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import Link from 'next/link';
import { Heart, Sparkles, BookOpen, ArrowRight, Users } from 'lucide-react';
import PhotoFrame from '@/components/PhotoFrame';

export default async function OurStoryPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const isIndo = locale === 'id';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* 1. Header & Vision Statement */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-covenant-100 to-royalPurple-100 border border-covenant-200 text-covenant-900 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Heart className="w-3.5 h-3.5 text-royalPurple-600 fill-current" />
          <span>{isIndo ? 'Kisah & Kesaksian Anugerah' : 'Our Covenant Story & Testimony'}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
          {dict.ourStory.title}
        </h1>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
          {dict.ourStory.subtitle}
        </p>
      </div>

      {/* 2. Visual / Full Family Studio Portrait Banner */}
      <div className="relative">
        <PhotoFrame
          src="/images/family/family-full-studio.jpg"
          alt={isIndo ? 'Keluarga Besar Boris Manurung' : 'Boris Manurung Family Portrait'}
          aspectRatio="wide"
          locale={locale}
          priority
        />
      </div>

      {/* 3. Founders' Burden & Theological Foundation */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5">
            <PhotoFrame
              src="/images/family/boris-wife-25years.jpg"
              alt={isIndo ? 'Boris Manurung & Istri' : 'Boris Manurung & Wife'}
              aspectRatio="landscape"
              locale={locale}
            />
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-covenant-100 text-covenant-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-covenant-600" />
              <span>{isIndo ? 'Surat & Kesaksian Pendiri' : 'Founders’ Heart & Testimony'}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              {dict.ourStory.foundersTitle}
            </h2>

            {isIndo ? (
              <>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  Ketika Tuhan memanggil dan mempertemukan kami dalam kovenan pernikahan, kami tidak pernah menyangka bahwa perjalanan ini akan menjadi sekolah iman yang paling intensif dalam hidup kami. Di dalam pernikahan, kami melihat betapa ego manusia begitu rapuh, betapa mudahnya luka terjadi, dan betapa kita sangat membutuhkan anugerah salib Kristus setiap hari.
                </p>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  Melalui musim-musim pembentukan, pengampunan, pemulihan komunikasi, dan pembaruan komitmen, Tuhan menaruh sebuah beban kudus di dalam hati kami: <strong className="text-covenant-800 font-semibold">Pernikahan bukan sekadar tentang mengejar kebahagiaan dua orang. Pernikahan adalah mahakarya Allah yang dirancang untuk memantulkan gambar dan kemuliaan-Nya.</strong>
                </p>
              </>
            ) : (
              <>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  When God called and united us in holy covenant marriage, we never anticipated that this journey would become the most intensive school of faith in our lives. In marriage, we realized how fragile human ego is, how easily wounds occur, and how desperately we need the grace of Christ’s cross every single day.
                </p>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  Through seasons of refining, forgiveness, restored communication, and renewed vows, God placed a sacred burden within our hearts: <strong className="text-covenant-800 font-semibold">Marriage is not merely about pursuing personal happiness between two people. Marriage is God’s masterpiece designed to reflect His image and His glory.</strong>
                </p>
              </>
            )}

            <div className="bg-gradient-to-r from-covenant-50 to-royalPurple-50/50 p-5 rounded-2xl border border-covenant-200/80">
              <h3 className="font-serif font-bold text-sm sm:text-base text-covenant-900 mb-1.5">
                {dict.ourStory.biblicalFoundationTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {dict.ourStory.biblicalFoundationText}
              </p>
            </div>
          </div>
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
            {isIndo
              ? 'Nilai-nilai alkitabiah yang menjadi pegangan kami dalam membina keluarga dan melayani jemaat.'
              : 'Biblical core values guiding our family formation and ministry service.'}
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

      {/* 6. Family & Generations Gallery */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-covenant-100 to-royalPurple-100 border border-covenant-200 text-covenant-900 text-xs font-semibold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-royalPurple-600" />
            <span>{isIndo ? 'Generasi Kovenan' : 'Covenant Generations'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
            {isIndo
              ? 'Mezbah Keluarga & Buah Kasih Kovenan'
              : 'The Family Altar & Fruits of Covenant Love'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {isIndo
              ? 'Dari sebuah kovenan pernikahan yang dipegang teguh, Tuhan melahirkan keluarga yang saling mengasihi, mengampuni, dan memancarkan terang Kristus kepada generasi selanjutnya.'
              : 'From a steadfast covenant marriage, God raises a family that loves unconditionally, walks in forgiveness, and reflects the light of Christ to the next generation.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <PhotoFrame
            src="/images/family/family-full-maroon.jpg"
            alt={isIndo ? 'Keluarga Boris Manurung' : 'Boris Manurung Family'}
            aspectRatio="landscape"
            locale={locale}
          />

          <PhotoFrame
            src="/images/family/children-blue-purple.jpg"
            alt={isIndo ? 'Kelima Anak Boris Manurung' : 'Five Children of Boris Manurung'}
            aspectRatio="portrait"
            locale={locale}
          />

          <PhotoFrame
            src="/images/family/boris-wife-blue-purple.jpg"
            alt={isIndo ? 'Boris Manurung dan Istri' : 'Boris Manurung and Wife'}
            aspectRatio="portrait"
            locale={locale}
          />

          <PhotoFrame
            src="/images/family/boris-and-sons.jpg"
            alt={isIndo ? 'Boris Manurung bersama Tiga Putra' : 'Boris Manurung with Three Sons'}
            aspectRatio="landscape"
            locale={locale}
          />

          <PhotoFrame
            src="/images/family/mama-and-daughters.jpg"
            alt={isIndo ? 'Mama bersama Kedua Putri' : 'Mama with Two Daughters'}
            aspectRatio="portrait"
            locale={locale}
          />

          <PhotoFrame
            src="/images/family/tassel-birthday.jpg"
            alt={isIndo ? 'Perayaan Ulang Tahun Tassel' : 'Tassel Birthday Celebration'}
            aspectRatio="landscape"
            locale={locale}
          />
        </div>
      </div>

      {/* 7. Ministry Declaration */}
      <div className="bg-gradient-to-br from-covenant-900 to-navy-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-6">
        <span className="text-xs font-semibold tracking-widest uppercase text-covenant-300">
          {isIndo ? 'Ikrar Komitmen Kovenan' : 'Covenant Commitment Declaration'}
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
