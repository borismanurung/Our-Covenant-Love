'use client';

import { useState } from 'react';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/getDictionary';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactFormProps {
  locale: Locale;
  dict: Dictionary;
}

export default function ContactForm({ locale, dict }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    honeypot: '', // Hidden bot trap field
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          locale,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        honeypot: '',
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'An unexpected error occurred.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
        <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
        <h3 className="text-xl font-serif font-bold text-emerald-900">
          {dict.contact.successTitle}
        </h3>
        <p className="text-sm text-emerald-700 max-w-md mx-auto">
          {dict.contact.successDesc}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="inline-flex items-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-white border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors"
        >
          Kirim Pesan Lain / Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
      {/* Honeypot field (hidden from genuine users, visible to spam bots) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_hp">Leave this field blank</label>
        <input
          type="text"
          id="website_hp"
          name="website_hp"
          tabIndex={-1}
          autoComplete="off"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 p-3 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            {dict.contact.nameLabel} *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-covenant-500 focus:border-covenant-500 transition-all outline-none"
            placeholder="e.g. Samuel & Maria"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            {dict.contact.emailLabel} *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-covenant-500 focus:border-covenant-500 transition-all outline-none"
            placeholder="e.g. name@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            {dict.contact.phoneLabel}
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-covenant-500 focus:border-covenant-500 transition-all outline-none"
            placeholder="e.g. 0812 3456 7890"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            {dict.contact.subjectLabel} *
          </label>
          <input
            type="text"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-covenant-500 focus:border-covenant-500 transition-all outline-none"
            placeholder="e.g. Konsultasi Seminar / Pertanyaan"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
          {dict.contact.messageLabel} *
        </label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-covenant-500 focus:border-covenant-500 transition-all outline-none resize-y"
          placeholder="Tuliskan pesan, permohonan doa, atau informasi kebutuhan pelayanan..."
        />
      </div>

      <div className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
        {dict.contact.privacyNote}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-covenant-600 hover:bg-covenant-700 active:bg-covenant-800 text-white font-medium text-sm transition-colors shadow-sm disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        <span>{status === 'loading' ? dict.contact.sendingButton : dict.contact.sendButton}</span>
      </button>
    </form>
  );
}
