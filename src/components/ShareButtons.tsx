'use client';

import { useState } from 'react';
import { Share2, Check, MessageCircle } from 'lucide-react';
import { Locale } from '@/i18n/config';

interface ShareButtonsProps {
  title: string;
  url?: string;
  locale?: Locale;
}

export default function ShareButtons({ title, url, locale = 'id' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : (url || '');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(`${title}\n${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-500 font-medium">{locale === 'id' ? 'Bagikan:' : 'Share:'}</span>
      <button
        type="button"
        onClick={copyToClipboard}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        title={locale === 'id' ? 'Salin Tautan' : 'Copy Link'}
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
        <span>{copied ? (locale === 'id' ? 'Tersalin!' : 'Copied!') : (locale === 'id' ? 'Salin Tautan' : 'Copy Link')}</span>
      </button>

      <button
        type="button"
        onClick={shareToWhatsApp}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
        title={locale === 'id' ? 'Bagikan lewat WhatsApp' : 'Share via WhatsApp'}
      >
        <MessageCircle className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </button>
    </div>
  );
}
