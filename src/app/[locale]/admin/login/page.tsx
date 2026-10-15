'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Locale } from '@/i18n/config';
import { Shield, Lock, Mail, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const router = useRouter();

  const [email, setEmail] = useState('admin@ourcovenantlove.org');
  const [password, setPassword] = useState('Covenant2026!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed.');
      }

      router.push(`/${locale}/admin`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Invalid email or password.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-covenant-100 text-covenant-700 flex items-center justify-center mx-auto shadow-xs">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {locale === 'id' ? 'Masuk Portal Pengelola' : 'Admin Portal Login'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            {locale === 'id'
              ? 'Akses khusus staf dan pengelola Our Covenant Love'
              : 'Authorized personnel access only'}
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-covenant-500 focus:border-covenant-500 transition-all outline-none"
                placeholder="admin@ourcovenantlove.org"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              {locale === 'id' ? 'Kata Sandi' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-covenant-500 focus:border-covenant-500 transition-all outline-none"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          {/* Development / Demo credentials hint */}
          <div className="p-3 bg-covenant-50 border border-covenant-200 rounded-xl text-xs text-covenant-900 space-y-1">
            <div className="flex items-center gap-1 font-semibold text-covenant-800">
              <Sparkles className="w-3.5 h-3.5 text-covenant-600" />
              <span>{locale === 'id' ? 'Kredensial Pengelola Bawaan' : 'Default Admin Credentials'}:</span>
            </div>
            <div className="font-mono text-[11px] text-slate-700">
              Email: admin@ourcovenantlove.org<br />
              Pass: Covenant2026!
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-covenant-700 hover:bg-covenant-800 text-white font-semibold text-sm transition-colors shadow-sm disabled:opacity-50"
          >
            <span>{loading ? (locale === 'id' ? 'Memverifikasi...' : 'Verifying...') : (locale === 'id' ? 'Masuk ke Dasbor' : 'Sign In to Dashboard')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <Link
            href={`/${locale}`}
            className="text-xs font-medium text-slate-500 hover:text-covenant-700 transition-colors"
          >
            &larr; {locale === 'id' ? 'Kembali ke Beranda Situs' : 'Back to Public Site'}
          </Link>
        </div>
      </div>
    </div>
  );
}
