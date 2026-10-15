'use client';

import { useState } from 'react';
import { Locale } from '@/i18n/config';
import PhotoFrame from './PhotoFrame';
import { Heart, Users, Sparkles, Shield, Camera } from 'lucide-react';
import Link from 'next/link';

interface FamilyShowcaseProps {
  locale: Locale;
}

export default function FamilyShowcase({ locale }: FamilyShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'founders' | 'family' | 'children'>('all');

  const photos = [
    {
      id: 'founders-25',
      category: 'founders',
      src: '/images/family/boris-wife-25years.jpg',
      alt: 'Boris Manurung dan Istri - 25 Tahun Pernikahan Kovenan',
      caption: locale === 'id' ? 'Boris & Istri — 25 Tahun Kasih Kovenan' : 'Boris & Wife — 25 Years of Covenant Love',
      subtitle: locale === 'id'
        ? '"We’ve been married for 25 years" — Menjadi saksi nyata bahwa kasih Allah memampukan kita setia seumur hidup.'
        : '"We’ve been married for 25 years" — A living testimony that God’s steadfast love sustains lifelong faithfulness.',
      badge: '25th Anniversary',
      featured: true,
      aspectRatio: 'landscape' as const,
    },
    {
      id: 'family-studio',
      category: 'family',
      src: '/images/family/family-full-studio.jpg',
      alt: 'Keluarga Lengkap Boris Manurung dan Kelima Anak',
      caption: locale === 'id' ? 'Keluarga Besar Boris Manurung' : 'The Boris Manurung Family',
      subtitle: locale === 'id'
        ? 'Diberkati dengan 5 orang anak yang bertumbuh bersama dalam firman dan mezbah keluarga.'
        : 'Blessed with 5 children growing together in God’s Word and family altar.',
      badge: locale === 'id' ? 'Keluarga Kovenan' : 'Covenant Family',
      featured: true,
      aspectRatio: 'landscape' as const,
    },
    {
      id: 'children-neon',
      category: 'children',
      src: '/images/family/children-blue-purple.jpg',
      alt: 'Kelima Anak Boris Manurung',
      caption: locale === 'id' ? 'Kelima Buah Hati & Generasi Kovenan' : 'The Five Children & Next Generation',
      subtitle: locale === 'id'
        ? 'Memuridkan generasi penerus untuk mengenal dan mencintai kebenaran Kristus.'
        : 'Discipling the next generation to know and abide in the truth of Christ.',
      badge: 'Next Generation',
      featured: false,
      aspectRatio: 'portrait' as const,
    },
    {
      id: 'founders-purple',
      category: 'founders',
      src: '/images/family/boris-wife-blue-purple.jpg',
      alt: 'Boris Manurung dan Istri',
      caption: locale === 'id' ? 'Kesatuan Jiwa & Roh' : 'Oneness of Soul & Spirit',
      subtitle: locale === 'id'
        ? 'Pernikahan adalah penyingkapan misteri Kristus dan jemaat-Nya.'
        : 'Marriage reflects the holy mystery of Christ and His church.',
      badge: 'Imago Dei',
      featured: false,
      aspectRatio: 'portrait' as const,
    },
    {
      id: 'father-sons',
      category: 'children',
      src: '/images/family/boris-and-sons.jpg',
      alt: 'Boris Manurung bersama Ketiga Putra',
      caption: locale === 'id' ? 'Teladan Ayah & Ketiga Putra' : 'Father & Three Sons',
      subtitle: locale === 'id'
        ? 'Mewariskan integritas iman, karakter kepemimpinan yang melayani, dan kasih bagi keluarga.'
        : 'Imparting faith integrity, servant leadership, and covenant love to sons.',
      badge: 'Father & Sons',
      featured: false,
      aspectRatio: 'landscape' as const,
    },
    {
      id: 'mother-daughters',
      category: 'children',
      src: '/images/family/mama-and-daughters.jpg',
      alt: 'Mama bersama Kedua Putri',
      caption: locale === 'id' ? 'Teladan Ibu & Kedua Putri' : 'Mother & Two Daughters',
      subtitle: locale === 'id'
        ? 'Membimbing putri-putri menjadi wanita salehah yang berakar kuat dalam anugerah Tuhan.'
        : 'Nurturing daughters into godly women anchored in divine grace and dignity.',
      badge: 'Mother & Daughters',
      featured: false,
      aspectRatio: 'portrait' as const,
    },
    {
      id: 'family-maroon',
      category: 'family',
      src: '/images/family/family-full-maroon.jpg',
      alt: 'Keluarga Boris Manurung Seragam Maroon',
      caption: locale === 'id' ? 'Sehati, Sepikir, Satu Kasih' : 'One Heart, One Mind, One Love',
      subtitle: locale === 'id'
        ? 'Kebersamaan hangat yang dirawat melalui doa, pengampunan, dan komunikasi harian.'
        : 'Warm unity nurtured through prayer, forgiveness, and daily intentional connection.',
      badge: 'United in Christ',
      featured: false,
      aspectRatio: 'landscape' as const,
    },
    {
      id: 'tassel-birthday',
      category: 'family',
      src: '/images/family/tassel-birthday.jpg',
      alt: 'Ulang Tahun Tassel bersama Orang Tua',
      caption: locale === 'id' ? 'Merayakan Kasih Pertambahan Usia' : 'Celebrating Life & Milestones',
      subtitle: locale === 'id'
        ? 'Bersyukur atas setiap musim kehidupan dan kesetiaan Tuhan yang nyata.'
        : 'Thankful for every season of life and God’s evident faithfulness.',
      badge: 'Family Milestone',
      featured: false,
      aspectRatio: 'landscape' as const,
    },
  ];

  const filteredPhotos = activeCategory === 'all'
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-white via-covenant-50/40 to-slate-50 border-y border-slate-200/80">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-covenant-300/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-royalPurple-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-covenant-100 to-royalPurple-100 border border-covenant-200 text-covenant-900 text-xs font-semibold tracking-wide shadow-xs">
            <Heart className="w-3.5 h-3.5 text-royalPurple-600 fill-current" />
            <span>
              {locale === 'id'
                ? 'Keluarga & Pendiri Pelayanan'
                : 'Founders & Family Showcase'}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            {locale === 'id'
              ? '25 Tahun Kasih Kovenan: Menjadi Panggung Berjalan Kemuliaan Allah'
              : '25 Years of Covenant Love: A Living Showcase of God’s Glory'}
          </h2>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            {locale === 'id'
              ? 'Our Covenant Love tidak lahir dari teori akademis, melainkan dari perjalanan nyata 25 tahun pernikahan kovenan Boris Manurung dan istri, membina mezbah keluarga, membesarkan 5 orang anak, dan mengalami anugerah pemulihan Kristus setiap hari.'
              : 'Our Covenant Love was born not of abstract theory, but through 25 years of covenant marriage of Boris Manurung and his wife, building the family altar, raising 5 children, and experiencing the redeeming grace of Christ daily.'}
          </p>
        </div>

        {/* Filter Navigation Tabs with Silver Lining */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: locale === 'id' ? 'Semua Momen' : 'All Moments', icon: Camera },
            { id: 'founders', label: locale === 'id' ? 'Boris & Istri (25 Tahun)' : 'Boris & Wife (25 Years)', icon: Heart },
            { id: 'family', label: locale === 'id' ? 'Keluarga Lengkap' : 'Full Family', icon: Users },
            { id: 'children', label: locale === 'id' ? 'Anak-Anak & Generasi' : 'Children & Next Gen', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeCategory === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-r from-covenant-700 via-indigo-700 to-royalPurple-700 text-white shadow-md shadow-covenant-700/20 scale-[1.02]'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 hover:border-covenant-300 shadow-xs'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Photo Gallery Grid with Silver Lining Frames */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo) => (
            <PhotoFrame
              key={photo.id}
              src={photo.src}
              alt={photo.alt}
              caption={photo.caption}
              subtitle={photo.subtitle}
              badge={photo.badge}
              aspectRatio={photo.aspectRatio}
              className="h-full"
            />
          ))}
        </div>

        {/* Bottom Callout / Testimony Quote */}
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-navy-950 via-navy-900 to-covenant-950 text-white shadow-xl border border-slate-700/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-royalPurple-600/10 rounded-full blur-2xl" />
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-covenant-300">
              {locale === 'id' ? 'Kesaksian Kovenan Boris & Keluarga' : 'Boris & Family Covenant Testimony'}
            </span>
            <blockquote className="font-serif italic text-lg sm:text-2xl text-slate-100 leading-relaxed">
              &ldquo;
              {locale === 'id'
                ? 'Keluarga kami bukan keluarga yang sempurna, tetapi keluarga yang hidup dari anugerah Allah yang sempurna. Di dalam salib Kristus, kami menemukan kekuatan untuk mengasihi tanpa syarat, mengampuni tanpa batas, dan membesarkan generasi yang takut akan Tuhan.'
                : 'Our family is not a perfect family, but a family sustained by God’s perfect grace. In the cross of Christ, we found the strength to love unconditionally, forgive without limits, and disciple a generation that fears the Lord.'}
              &rdquo;
            </blockquote>
            <div className="pt-2 text-xs sm:text-sm text-covenant-300 font-medium">
              — Boris Manurung &amp; Istri &bull; Our Covenant Love Ministry
            </div>
            <div className="pt-4">
              <Link
                href={`/${locale}/our-story`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-covenant-600 hover:bg-covenant-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95"
              >
                <span>{locale === 'id' ? 'Baca Kisah Panggilan Kami' : 'Read Our Full Calling & Story'}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
