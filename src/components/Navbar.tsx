'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/getDictionary';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X, Heart, Shield } from 'lucide-react';

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

  const navLinks = [
    { href: `/${locale}`, label: dict.common.home },
    { href: `/${locale}/our-story`, label: dict.common.ourStory },
    { href: `/${locale}/marriage-family`, label: dict.common.marriageFamily },
    { href: `/${locale}/bible-reading`, label: dict.common.bibleReading },
    { href: `/${locale}/articles`, label: dict.common.articles },
    { href: `/${locale}/sermons`, label: dict.common.sermons },
    { href: `/${locale}/music`, label: dict.common.music },
    { href: `/${locale}/events`, label: dict.common.events },
    { href: `/${locale}/contact`, label: dict.common.contact },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-covenant-200/60 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-covenant-500 rounded-lg p-1 flex-shrink-0"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-covenant-300 shadow-xs bg-covenant-100 flex-shrink-0">
              <Image
                src="/images/ocl-logo.jpg"
                alt={locale === 'id' ? 'Logo Our Covenant Love' : 'Our Covenant Love Logo'}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <span className="font-serif font-bold text-base sm:text-lg lg:text-xl tracking-tight text-slate-900 group-hover:text-covenant-800 transition-colors whitespace-normal break-words text-center max-w-[8rem] overflow-hidden leading-tight">
                Our Covenant Love
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium tracking-wider text-covenant-700 whitespace-normal break-words text-center max-w-[8rem] overflow-hidden">
                {locale === 'id' ? 'Memancarkan Kemuliaan Allah' : "Reflecting God's glory"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center flex-wrap space-x-0.5 xl:space-x-1 flex-shrink overflow-x-auto" aria-label={locale === 'id' ? 'Navigasi Utama' : 'Main Navigation'}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-colors whitespace-normal break-words text-center max-w-[8rem] overflow-hidden ${
                  isActive(link.href)
                    ? 'text-covenant-800 bg-covenant-100/70 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-covenant-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Bar (Language Switcher, Admin Link) - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher currentLocale={locale} />
            <Link
              href={`/${locale}/admin`}
              title={locale === 'id' ? 'Portal Admin' : 'Admin Portal'}
              className="p-2 text-slate-500 hover:text-covenant-700 hover:bg-covenant-50 rounded-full transition-colors"
            >
              <Shield className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile & Tablet Action Bar (Language Switcher + Menu Button) */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher currentLocale={locale} />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-covenant-500"
              aria-label={locale === 'id' ? 'Buka atau tutup menu' : 'Toggle navigation menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? 'bg-covenant-100 text-covenant-900 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <Link
              href={`/${locale}/admin`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-covenant-700 py-1"
            >
              <Shield className="w-4 h-4" />
              <span>{dict.common.admin}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
