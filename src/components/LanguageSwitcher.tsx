'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Locale, locales, localeNames } from '@/i18n/config';
import { Globe } from 'lucide-react';
import { useState } from 'react';

export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const switchLocale = (newLocale: Locale) => {
    setIsOpen(false);
    if (newLocale === currentLocale) return;

    // Replace the locale prefix in current pathname
    const segments = pathname.split('/');
    if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
      router.push(segments.join('/'));
    } else {
      router.push(`/${newLocale}`);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 hover:text-covenant-800 transition-colors focus:ring-2 focus:ring-covenant-500 focus:outline-none"
      >
        <Globe className="w-3.5 h-3.5 text-covenant-600" />
        <span>{localeNames[currentLocale].flag}</span>
        <span className="uppercase tracking-wider font-semibold">{currentLocale}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 z-50 py-1.5 overflow-hidden">
            <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Pilih Bahasa / Select Language
            </div>
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                  currentLocale === loc
                    ? 'bg-covenant-50 text-covenant-900 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{localeNames[loc].flag}</span>
                  <span>{localeNames[loc].nativeName}</span>
                </span>
                {currentLocale === loc && (
                  <span className="w-1.5 h-1.5 rounded-full bg-covenant-600" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
