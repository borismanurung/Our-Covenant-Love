'use client';

import { useState } from 'react';
import { Locale } from '@/i18n/config';
import { Mail, Phone, Calendar, ExternalLink, CheckCircle, Search, MessageSquare } from 'lucide-react';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  locale: string;
  status: string;
  createdAt: string | Date;
}

interface InquiriesManagerProps {
  locale: Locale;
  initialInquiries: Inquiry[];
}

export default function InquiriesManager({
  locale,
  initialInquiries,
}: InquiriesManagerProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const filtered = inquiries.filter((inq) => {
    if (statusFilter !== 'ALL' && inq.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        inq.name.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        inq.subject.toLowerCase().includes(q) ||
        inq.message.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {['ALL', 'NEW', 'READ', 'REPLIED'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                statusFilter === st
                  ? 'bg-covenant-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={locale === 'id' ? 'Cari nama, email, isi...' : 'Search name, email, text...'}
            className="w-full px-3.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-covenant-500 outline-none"
          />
        </div>
      </div>

      {/* Main Grid: List and Detail Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Inquiries List */}
        <div className="lg:col-span-5 space-y-3">
          {filtered.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
              {locale === 'id' ? 'Tidak ada pesan kontak yang cocok.' : 'No inquiries match your criteria.'}
            </div>
          ) : (
            filtered.map((inq) => {
              const isSelected = selectedInquiry?.id === inq.id;
              return (
                <div
                  key={inq.id}
                  onClick={() => setSelectedInquiry(inq)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                    isSelected
                      ? 'bg-covenant-50 border-covenant-400 shadow-xs'
                      : 'bg-white border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-900">{inq.name}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        inq.status === 'NEW'
                          ? 'bg-rose-100 text-rose-800'
                          : inq.status === 'REPLIED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>

                  <div className="text-xs font-medium text-slate-800 truncate">
                    {inq.subject}
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {inq.message}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                    <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                    <span className="uppercase font-mono">{inq.locale}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Detail Viewer */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 min-h-[350px]">
          {selectedInquiry ? (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-serif font-bold text-xl text-slate-900">
                    {selectedInquiry.subject}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {new Date(selectedInquiry.createdAt).toLocaleString(
                      locale === 'id' ? 'id-ID' : 'en-US'
                    )}
                  </div>
                </div>

                <a
                  href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(selectedInquiry.subject)}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-covenant-700 hover:bg-covenant-800 text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{locale === 'id' ? 'Balas via Email' : 'Reply by Email'}</span>
                </a>
              </div>

              {/* Sender Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-700">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Pengirim</span>
                  <strong>{selectedInquiry.name}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Email</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-covenant-700 underline">
                    {selectedInquiry.email}
                  </a>
                </div>
                {selectedInquiry.phone && (
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">No. Telepon / WA</span>
                    <a
                      href={`https://api.whatsapp.com/send?phone=${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-medium inline-flex items-center gap-1"
                    >
                      <span>{selectedInquiry.phone}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Bahasa Pengirim</span>
                  <span className="font-mono uppercase font-semibold">{selectedInquiry.locale}</span>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">
                  Isi Pesan / Message:
                </span>
                <div className="whitespace-pre-line text-sm text-slate-800 leading-relaxed bg-slate-50/50 p-5 rounded-xl border border-slate-200">
                  {selectedInquiry.message}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 text-slate-400 space-y-3">
              <MessageSquare className="w-12 h-12 stroke-1 text-slate-300" />
              <p className="text-xs sm:text-sm">
                {locale === 'id'
                  ? 'Pilih pesan di sebelah kiri untuk melihat isi lengkap.'
                  : 'Select an inquiry on the left to read full details.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
