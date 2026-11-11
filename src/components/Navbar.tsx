'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/getDictionary';
import LanguageSwitcher from './LanguageSwitcher';
import {
  Menu,
  X,
  Shield,
  Home,
  Heart,
  HeartHandshake,
  BookOpen,
  FileText,
  Video,
  Music,
  Calendar,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Navbar({ locale, dict }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  // Close mobile drawer when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: `/${locale}`, label: dict.common.home, icon: Home },
    { href: `/${locale}/our-story`, label: dict.common.ourStory, icon: Heart },
    { href: `/${locale}/marriage-family`, label: dict.common.marriageFamily, icon: HeartHandshake },
    { href: `/${locale}/bible-reading`, label: dict.common.bibleReading, icon: BookOpen },
    { href: `/${locale}/articles`, label: dict.common.articles, icon: FileText },
    { href: `/${locale}/sermons`, label: dict.common.sermons, icon: Video },
    { href: `/${locale}/music`, label: dict.common.music, icon: Music },
    { href: `/${locale}/events`, label: dict.common.events, icon: Calendar },
    { href: `/${locale}/contact`, label: dict.common.contact, icon: MessageSquare },
    { href: `/${locale}/pernikahan-keluarga`, label: '2=1 Ministry™', icon: Sparkles },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ======================================================== */}
      {/* 1. DESKTOP LEFT SIDEBAR NAVIGATION PANE                  */}
      {/* ======================================================== */}
      <aside
        className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-64 xl:w-72 bg-white border-r border-covenant-200/70 shadow-xs flex-col justify-between"
        aria-label={locale === 'id' ? 'Navigasi Samping' : 'Side Navigation'}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-covenant-100/80 bg-gradient-to-b from-covenant-50/50 to-transparent">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-covenant-500 rounded-xl p-1"
          >
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-covenant-300 shadow-xs bg-covenant-100 flex-shrink-0">
              <Image
                src="/images/ocl-logo.jpg"
                alt={locale === 'id' ? 'Logo Our Covenant Love' : 'Our Covenant Love Logo'}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif font-bold text-base xl:text-lg tracking-tight text-slate-900 group-hover:text-covenant-800 transition-colors leading-tight">
                Our Covenant Love
              </span>
              <span className="text-[11px] font-medium tracking-wide text-covenant-700 truncate mt-0.5">
                {locale === 'id' ? 'Memancarkan Kemuliaan Allah' : "Reflecting God's glory"}
              </span>
            </div>
          </Link>
        </div>

        {/* Upper Language Selector Bar */}
        <div className="px-4 py-2.5 border-b border-covenant-100/70 bg-slate-50/60 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            {locale === 'id' ? 'Bahasa' : 'Language'}
          </span>
          <LanguageSwitcher currentLocale={locale} />
        </div>

        {/* Vertical Links List (Spacious & No Truncation) */}
        <nav className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1">
          <div className="px-2.5 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {locale === 'id' ? 'Menu Utama' : 'Main Menu'}
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs xl:text-sm font-medium transition-all ${
                  active
                    ? 'bg-covenant-100/90 text-covenant-900 font-semibold shadow-xs border-l-4 border-covenant-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-covenant-50/70'
                }`}
              >
                <Icon
                  className={`w-4 h-4 flex-shrink-0 transition-colors ${
                    active ? 'text-covenant-700' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                <span className="truncate">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer: Admin Portal & Version */}
        <div className="p-3.5 border-t border-covenant-100/80 bg-slate-50/70 flex items-center justify-between">
          <Link
            href={`/${locale}/admin`}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-covenant-800 transition-colors"
          >
            <Shield className="w-4 h-4 text-slate-400" />
            <span>{dict.common.admin}</span>
          </Link>

          <span className="text-[10px] text-slate-400 font-mono">v1.0</span>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. MOBILE & TABLET TOP HEADER BAR (< lg)                 */}
      {/* ======================================================== */}
      <header className="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-covenant-200/60 shadow-xs">
        <div className="px-4 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href={`/${locale}`} className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-covenant-300 shadow-xs bg-covenant-100 flex-shrink-0">
              <Image
                src="/images/ocl-logo.jpg"
                alt="Logo Our Covenant Love"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif font-bold text-sm sm:text-base text-slate-900 truncate">
                Our Covenant Love
              </span>
              <span className="text-[10px] text-covenant-700 truncate">
                {locale === 'id' ? 'Memancarkan Kemuliaan Allah' : "Reflecting God's glory"}
              </span>
            </div>
          </Link>

          {/* Action buttons (Language Switcher + Hamburger) */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher currentLocale={locale} />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-covenant-500"
              aria-label={locale === 'id' ? 'Buka atau tutup menu navigasi' : 'Toggle navigation menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 3. MOBILE & TABLET SLIDE-OUT DRAWER                      */}
      {/* ======================================================== */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200">
            <div>
              {/* Header inside drawer */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-covenant-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-covenant-300">
                    <Image src="/images/ocl-logo.jpg" alt="Logo" fill className="object-cover" />
                  </div>
                  <span className="font-serif font-bold text-sm text-slate-900">
                    Our Covenant Love
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Language Switcher in Drawer */}
              <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  {locale === 'id' ? 'Bahasa' : 'Language'}
                </span>
                <LanguageSwitcher currentLocale={locale} />
              </div>

              {/* Navigation list */}
              <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-160px)]">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        active
                          ? 'bg-covenant-100 text-covenant-900 font-semibold border-l-4 border-covenant-700'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 flex-shrink-0 ${
                          active ? 'text-covenant-700' : 'text-slate-400'
                        }`}
                      />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Admin Link */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <Link
                href={`/${locale}/admin`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-covenant-800"
              >
                <Shield className="w-4 h-4 text-covenant-600" />
                <span>{dict.common.admin}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
