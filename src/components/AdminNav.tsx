'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Locale } from '@/i18n/config';
import { LayoutDashboard, FileText, Mail, LogOut, Shield } from 'lucide-react';

interface AdminNavProps {
  locale: Locale;
  user?: {
    name: string;
    email: string;
    role: string;
  } | null;
}

export default function AdminNav({ locale, user }: AdminNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push(`/${locale}/admin/login`);
      router.refresh();
    } catch {
      router.push(`/${locale}/admin/login`);
    }
  };

  const navItems = [
    {
      href: `/${locale}/admin`,
      label: locale === 'id' ? 'Dasbor' : 'Dashboard',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: `/${locale}/admin/content`,
      label: locale === 'id' ? 'Manajemen Konten' : 'Content Manager',
      icon: FileText,
      exact: false,
    },
    {
      href: `/${locale}/admin/inquiries`,
      label: locale === 'id' ? 'Pesan Masuk' : 'Inquiries',
      icon: Mail,
      exact: false,
    },
  ];

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Brand & User */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-covenant-500/20 text-covenant-400 flex items-center justify-center">
          <Shield className="w-5 h-5 text-covenant-400" />
        </div>
        <div>
          <div className="font-serif font-bold text-base text-white">
            {locale === 'id' ? 'Portal Pengelola Pelayanan' : 'Ministry Admin Portal'}
          </div>
          {user && (
            <div className="text-xs text-covenant-300">
              {user.name} ({user.email})
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-covenant-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:text-rose-100 hover:bg-rose-950/60 transition-colors ml-2"
          title="Log out"
        >
          <LogOut className="w-4 h-4" />
          <span>{locale === 'id' ? 'Keluar' : 'Logout'}</span>
        </button>
      </div>
    </div>
  );
}
