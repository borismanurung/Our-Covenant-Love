import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/getDictionary';
import { MapPin, Phone, Mail, Heart, Instagram } from 'lucide-react';

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Footer({ locale, dict }: FooterProps) {
  return (
    <footer className="bg-navy-900 text-slate-300 border-t border-navy-800">
      {/* Top Banner / Motto */}
      <div className="bg-covenant-900/60 border-b border-covenant-800/40 py-8 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="font-serif italic text-base sm:text-lg text-covenant-200">
            &ldquo;{dict.common.motto}&rdquo;
          </p>
          <span className="inline-block mt-2 text-xs font-semibold tracking-widest uppercase text-covenant-400">
            {locale === 'id'
              ? 'Kejadian 1:26–28 • Yohanes 17:20–23 • Efesus 5:31–32'
              : 'Genesis 1:26–28 • John 17:20–23 • Ephesians 5:31–32'}
          </span>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-covenant-500/50 bg-covenant-950 flex-shrink-0">
                <Image
                  src="/images/ocl-logo.jpg"
                  alt={locale === 'id' ? 'Logo Our Covenant Love' : 'Our Covenant Love'}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-serif font-bold text-xl text-white whitespace-nowrap leading-tight">
                  Our Covenant Love
                </span>
                <span className="text-[11px] font-medium tracking-wide text-covenant-400 whitespace-nowrap">
                  {locale === 'id' ? 'Memancarkan Kemuliaan Allah' : "Reflecting God's glory"}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {dict.footer.aboutText}
            </p>
            <div className="text-xs text-covenant-400 font-medium">
              Serpong, Tangerang Selatan &bull; Indonesia
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-covenant-300 mb-4">
              {dict.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href={`/${locale}`} className="hover:text-covenant-400 transition-colors">
                  {dict.common.home}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/our-story`} className="hover:text-covenant-400 transition-colors">
                  {dict.common.ourStory}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/marriage-family`} className="hover:text-covenant-400 transition-colors">
                  {dict.common.marriageFamily}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/events`} className="hover:text-covenant-400 transition-colors">
                  {dict.common.events}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-covenant-400 transition-colors">
                  {dict.common.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Content & Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-covenant-300 mb-4">
              {dict.footer.resources}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href={`/${locale}/bible-reading`} className="hover:text-covenant-400 transition-colors">
                  {dict.common.bibleReading}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/articles`} className="hover:text-covenant-400 transition-colors">
                  {dict.common.articles}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/sermons`} className="hover:text-covenant-400 transition-colors">
                  {dict.common.sermons}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/music`} className="hover:text-covenant-400 transition-colors">
                  {dict.common.music}
                </Link>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@borismanurung2626"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-covenant-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>YouTube Channel (@borismanurung2626)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-covenant-300 mb-4">
              {dict.contact.officeTitle}
            </h3>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-covenant-400 mt-1 flex-shrink-0" />
                <span>{dict.contact.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-covenant-400 flex-shrink-0" />
                <span>{dict.contact.contactPerson}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-covenant-400 flex-shrink-0" />
                <span>contact@ourcovenantlove.org</span>
              </div>
              <div className="pt-2 text-xs text-slate-400">
                {dict.contact.socialMedia}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>{dict.footer.copyright}</p>
          <div className="flex items-center space-x-6">
            <Link href={`/${locale}/contact`} className="hover:text-slate-300">
              {dict.footer.privacyPolicy}
            </Link>
            <Link href={`/${locale}/admin`} className="hover:text-covenant-400">
              {dict.common.admin}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
