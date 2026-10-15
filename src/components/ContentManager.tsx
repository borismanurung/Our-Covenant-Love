'use client';

import { useState } from 'react';
import { Locale } from '@/i18n/config';
import {
  Plus,
  Trash2,
  ExternalLink,
  Sparkles,
  FileText,
  Video,
  Music,
  Calendar,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

interface ContentManagerProps {
  locale: Locale;
  initialItems: any[];
}

export default function ContentManager({ locale, initialItems }: ContentManagerProps) {
  const [items, setItems] = useState(initialItems);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    type: 'ARTICLE',
    isFeatured: false,
    author: 'Our Covenant Love Team',
    speaker: '',
    scriptureRef: '',
    seriesTitle: '',
    videoUrl: '',
    audioUrl: '',
    chordSheet: '',
    eventDate: '',
    eventLocation: '',
    registrationUrl: '',
    titleId: '',
    excerptId: '',
    bodyId: '',
    titleEn: '',
    excerptEn: '',
    bodyEn: '',
  });

  const filteredItems = items.filter((item) => {
    if (filterType !== 'ALL' && item.type !== filterType) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const hasMatch = item.translations.some(
        (t: any) =>
          t.title.toLowerCase().includes(q) ||
          t.excerpt?.toLowerCase().includes(q) ||
          t.slug.toLowerCase().includes(q)
      );
      if (!hasMatch) return false;
    }
    return true;
  });

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(locale === 'id' ? `Yakin ingin menghapus "${title}"?` : `Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/content?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete content');
      setItems((prev) => prev.filter((i) => i.id !== id));
      setMessage({
        type: 'success',
        text: locale === 'id' ? 'Konten berhasil dihapus.' : 'Content deleted successfully.',
      });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Delete failed.' });
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const payload = {
        type: formData.type,
        isFeatured: formData.isFeatured,
        author: formData.author,
        speaker: formData.speaker || null,
        scriptureRef: formData.scriptureRef || null,
        seriesTitle: formData.seriesTitle || null,
        videoUrl: formData.videoUrl || null,
        audioUrl: formData.audioUrl || null,
        chordSheet: formData.chordSheet || null,
        eventDate: formData.eventDate || null,
        eventLocation: formData.eventLocation || null,
        registrationUrl: formData.registrationUrl || null,
        translations: [
          {
            locale: 'id',
            title: formData.titleId,
            slug: formData.titleId,
            excerpt: formData.excerptId,
            body: formData.bodyId,
          },
          {
            locale: 'en',
            title: formData.titleEn || formData.titleId,
            slug: formData.titleEn || formData.titleId,
            excerpt: formData.excerptEn || formData.excerptId,
            body: formData.bodyEn || formData.bodyId,
          },
        ],
      };

      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create content.');

      setItems([data.item, ...items]);
      setIsCreating(false);
      setMessage({
        type: 'success',
        text: locale === 'id' ? 'Konten baru berhasil diterbitkan!' : 'New content successfully created!',
      });
      // Reset form
      setFormData({
        type: 'ARTICLE',
        isFeatured: false,
        author: 'Our Covenant Love Team',
        speaker: '',
        scriptureRef: '',
        seriesTitle: '',
        videoUrl: '',
        audioUrl: '',
        chordSheet: '',
        eventDate: '',
        eventLocation: '',
        registrationUrl: '',
        titleId: '',
        excerptId: '',
        bodyId: '',
        titleEn: '',
        excerptEn: '',
        bodyEn: '',
      });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Creation failed.' });
    } finally {
      setLoading(false);
    }
  };

  const getPublicPath = (type: string, slug: string) => {
    switch (type) {
      case 'ARTICLE':
        return `/${locale}/articles/${slug}`;
      case 'SERMON':
        return `/${locale}/sermons/${slug}`;
      case 'SONG':
        return `/${locale}/music/${slug}`;
      case 'EVENT':
        return `/${locale}/events/${slug}`;
      default:
        return `/${locale}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Alert Messages */}
      {message && (
        <div
          className={`flex items-center gap-2 p-4 rounded-xl border text-sm ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Top Filter and Actions */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        {/* Type pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['ALL', 'ARTICLE', 'SERMON', 'SONG', 'EVENT'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterType === t
                  ? 'bg-covenant-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Search & Create button */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={locale === 'id' ? 'Saring judul / slug...' : 'Filter title / slug...'}
            className="px-3.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-covenant-500 outline-none w-full sm:w-48"
          />

          <button
            type="button"
            onClick={() => setIsCreating(!isCreating)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-covenant-700 hover:bg-covenant-800 text-white text-xs font-semibold transition-colors shadow-xs flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{isCreating ? (locale === 'id' ? 'Tutup Form' : 'Close Form') : (locale === 'id' ? 'Tambah Konten' : 'Add Content')}</span>
          </button>
        </div>
      </div>

      {/* Creation Drawer / Form */}
      {isCreating && (
        <form
          onSubmit={handleCreateSubmit}
          className="bg-white p-6 sm:p-8 rounded-2xl border border-covenant-300 shadow-md space-y-6"
        >
          <div className="border-b border-slate-200 pb-3">
            <h3 className="font-serif font-bold text-lg text-slate-900">
              {locale === 'id' ? 'Terbitkan Konten Baru' : 'Publish New Content'}
            </h3>
            <p className="text-xs text-slate-500">
              {locale === 'id'
                ? 'Isi formulir bilingual untuk otomatis menghasilkan versi Indonesia dan Inggris.'
                : 'Fill bilingual fields to automatically generate both Indonesian and English versions.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tipe Konten / Content Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none"
              >
                <option value="ARTICLE">ARTICLE (Artikel & Renungan)</option>
                <option value="SERMON">SERMON (Khotbah Video)</option>
                <option value="SONG">SONG (Lagu Orisinal)</option>
                <option value="EVENT">EVENT (Acara & Retret)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Penulis / Pembicara (Author / Speaker)
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value, speaker: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none"
                placeholder="Our Covenant Love Team"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Referensi Firman (Scripture Ref)
              </label>
              <input
                type="text"
                value={formData.scriptureRef}
                onChange={(e) => setFormData({ ...formData, scriptureRef: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none"
                placeholder="e.g. Efesus 5:25-33"
              />
            </div>
          </div>

          {/* Conditional Fields based on Type */}
          {formData.type === 'SERMON' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-purple-50/50 rounded-xl border border-purple-200">
              <div>
                <label className="block text-xs font-semibold text-purple-900 mb-1">
                  YouTube / Video URL
                </label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 text-xs bg-white border border-purple-200 rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-purple-900 mb-1">
                  Seri Khotbah (Series Title)
                </label>
                <input
                  type="text"
                  value={formData.seriesTitle}
                  onChange={(e) => setFormData({ ...formData, seriesTitle: e.target.value })}
                  placeholder="e.g. Fondasi Kovenan"
                  className="w-full px-3 py-2 text-xs bg-white border border-purple-200 rounded-lg outline-none"
                />
              </div>
            </div>
          )}

          {formData.type === 'SONG' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-amber-50/50 rounded-xl border border-amber-200">
              <div>
                <label className="block text-xs font-semibold text-amber-900 mb-1">
                  Audio URL (MP3 / Stream)
                </label>
                <input
                  type="url"
                  value={formData.audioUrl}
                  onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                  placeholder="https://.../song.mp3"
                  className="w-full px-3 py-2 text-xs bg-white border border-amber-200 rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-amber-900 mb-1">
                  Chord Sheet (Monospace Chords)
                </label>
                <textarea
                  rows={2}
                  value={formData.chordSheet}
                  onChange={(e) => setFormData({ ...formData, chordSheet: e.target.value })}
                  placeholder="[Intro] C G Am F..."
                  className="w-full px-3 py-2 text-xs font-mono bg-white border border-amber-200 rounded-lg outline-none"
                />
              </div>
            </div>
          )}

          {formData.type === 'EVENT' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-emerald-50/50 rounded-xl border border-emerald-200">
              <div>
                <label className="block text-xs font-semibold text-emerald-900 mb-1">
                  Tanggal Acara (Event Date)
                </label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-emerald-200 rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-emerald-900 mb-1">
                  Lokasi Acara (Location)
                </label>
                <input
                  type="text"
                  value={formData.eventLocation}
                  onChange={(e) => setFormData({ ...formData, eventLocation: e.target.value })}
                  placeholder="e.g. VMM Serpong / Zoom"
                  className="w-full px-3 py-2 text-xs bg-white border border-emerald-200 rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-emerald-900 mb-1">
                  Tautan Registrasi (Registration URL)
                </label>
                <input
                  type="url"
                  value={formData.registrationUrl}
                  onChange={(e) => setFormData({ ...formData, registrationUrl: e.target.value })}
                  placeholder="https://forms.gle/..."
                  className="w-full px-3 py-2 text-xs bg-white border border-emerald-200 rounded-lg outline-none"
                />
              </div>
            </div>
          )}

          {/* Bilingual Inputs side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Indonesian */}
            <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-covenant-800 uppercase tracking-wider block">
                🇮🇩 Bahasa Indonesia
              </span>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Judul *</label>
                <input
                  type="text"
                  required
                  value={formData.titleId}
                  onChange={(e) => setFormData({ ...formData, titleId: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                  placeholder="Judul artikel atau khotbah"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Ringkasan / Excerpt</label>
                <textarea
                  rows={2}
                  value={formData.excerptId}
                  onChange={(e) => setFormData({ ...formData, excerptId: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                  placeholder="Ringkasan singkat untuk kartu preview"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Isi Lengkap / Body *</label>
                <textarea
                  rows={6}
                  required
                  value={formData.bodyId}
                  onChange={(e) => setFormData({ ...formData, bodyId: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                  placeholder="Teks lengkap atau catatan renungan..."
                />
              </div>
            </div>

            {/* English */}
            <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-covenant-800 uppercase tracking-wider block">
                🇬🇧 English Translation
              </span>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Title (EN)</label>
                <input
                  type="text"
                  value={formData.titleEn}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                  placeholder="English title"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Excerpt (EN)</label>
                <textarea
                  rows={2}
                  value={formData.excerptEn}
                  onChange={(e) => setFormData({ ...formData, excerptEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                  placeholder="Short excerpt for cards"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Body (EN)</label>
                <textarea
                  rows={6}
                  value={formData.bodyEn}
                  onChange={(e) => setFormData({ ...formData, bodyEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                  placeholder="Full text or devotional body..."
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="rounded text-covenant-600 focus:ring-covenant-500"
              />
              <span>Tandai sebagai Konten Unggulan (Featured)</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-covenant-700 hover:bg-covenant-800 text-white text-xs font-semibold transition-colors disabled:opacity-50"
            >
              {loading ? 'Menyimpan...' : 'Simpan & Terbitkan Konten'}
            </button>
          </div>
        </form>
      )}

      {/* Content Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Tipe & Judul</th>
                <th className="py-3.5 px-4">Bahasa</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Tanggal</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    Tidak ada konten yang sesuai dengan filter.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const transId = item.translations.find((t: any) => t.locale === 'id');
                  const transEn = item.translations.find((t: any) => t.locale === 'en');
                  const activeTrans = transId || transEn || item.translations[0];
                  const publicPath = getPublicPath(item.type, activeTrans?.slug || item.id);

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-covenant-100 text-covenant-800">
                            {item.type}
                          </span>
                          {item.isFeatured && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800 flex items-center gap-0.5">
                              <Sparkles className="w-2.5 h-2.5" />
                              <span>Featured</span>
                            </span>
                          )}
                        </div>
                        <div className="font-semibold text-slate-900 mt-1 max-w-md truncate">
                          {activeTrans?.title || 'Untitled'}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Slug: {activeTrans?.slug}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1 text-[11px] font-mono">
                          {transId && <span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700">ID</span>}
                          {transEn && <span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700">EN</span>}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {item.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={publicPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-500 hover:text-covenant-700 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Preview Public Page"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>

                          <button
                            type="button"
                            onClick={() => handleDelete(item.id, activeTrans?.title || item.id)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Content"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
