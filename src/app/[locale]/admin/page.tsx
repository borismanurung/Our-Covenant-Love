import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { getSessionUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import AdminNav from '@/components/AdminNav';
import {
  FileText,
  Video,
  Music,
  Calendar,
  Mail,
  ArrowRight,
  PlusCircle,
  ExternalLink,
  Clock,
  Sparkles,
} from 'lucide-react';

export default async function AdminDashboardPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const dict = getDictionary(locale);

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('ocl_session')?.value;
  const user = await getSessionUser(sessionToken);

  // If no user session, redirect to login
  if (!user) {
    redirect(`/${locale}/admin/login`);
  }

  // Fetch metrics in parallel
  const [
    totalArticles,
    totalSermons,
    totalSongs,
    totalEvents,
    totalInquiries,
    newInquiriesCount,
    recentInquiries,
    recentContent,
  ] = await Promise.all([
    prisma.contentItem.count({ where: { type: 'ARTICLE' } }),
    prisma.contentItem.count({ where: { type: 'SERMON' } }),
    prisma.contentItem.count({ where: { type: 'SONG' } }),
    prisma.contentItem.count({ where: { type: 'EVENT' } }),
    prisma.contactInquiry.count(),
    prisma.contactInquiry.count({ where: { status: 'NEW' } }),
    prisma.contactInquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.contentItem.findMany({
      include: { translations: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ]);

  const stats = [
    {
      title: locale === 'id' ? 'Artikel & Renungan' : 'Articles & Devotionals',
      count: totalArticles,
      icon: FileText,
      href: `/${locale}/admin/content?type=ARTICLE`,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      title: locale === 'id' ? 'Khotbah & Video' : 'Sermons & Videos',
      count: totalSermons,
      icon: Video,
      href: `/${locale}/admin/content?type=SERMON`,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      title: locale === 'id' ? 'Lagu Orisinal' : 'Original Music',
      count: totalSongs,
      icon: Music,
      href: `/${locale}/admin/content?type=SONG`,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      title: locale === 'id' ? 'Acara & Retret' : 'Events & Retreats',
      count: totalEvents,
      icon: Calendar,
      href: `/${locale}/admin/content?type=EVENT`,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      title: locale === 'id' ? 'Pesan Masuk' : 'Total Inquiries',
      count: totalInquiries,
      subtext: newInquiriesCount > 0 ? `${newInquiriesCount} ${locale === 'id' ? 'belum dibaca' : 'new unread'}` : undefined,
      icon: Mail,
      href: `/${locale}/admin/inquiries`,
      color: 'bg-rose-50 text-rose-700 border-rose-200',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Nav Header */}
      <AdminNav locale={locale} user={user} />

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link
              key={i}
              href={stat.href}
              className={`p-5 rounded-2xl border ${stat.color} hover:shadow-md transition-all flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {stat.title}
                </span>
                <Icon className="w-5 h-5 opacity-80" />
              </div>
              <div className="mt-4">
                <div className="font-serif font-bold text-3xl">{stat.count}</div>
                {stat.subtext && (
                  <div className="text-[11px] font-semibold text-rose-800 bg-rose-100/80 px-2 py-0.5 rounded-md inline-block mt-1">
                    {stat.subtext}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </section>

      {/* Quick Action Bar */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-lg text-slate-900">
            {locale === 'id' ? 'Tindakan Cepat' : 'Quick Actions'}
          </h2>
          <p className="text-xs text-slate-500">
            {locale === 'id'
              ? 'Kelola konten pelayanan atau tinjau respons jemaat.'
              : 'Manage ministry content or review congregation responses.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/${locale}/admin/content`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-covenant-700 hover:bg-covenant-800 text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{locale === 'id' ? 'Kelola / Buat Konten' : 'Manage / Create Content'}</span>
          </Link>
          <Link
            href={`/${locale}/admin/inquiries`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>{locale === 'id' ? 'Buka Kotak Masuk' : 'Open Inquiries Inbox'}</span>
          </Link>
          <Link
            href={`/${locale}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
          >
            <span>{locale === 'id' ? 'Lihat Situs Publik' : 'View Public Portal'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Two Column Section: Recent Inquiries & Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Inquiries */}
        <section className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-covenant-600" />
              <span>{locale === 'id' ? 'Pesan Kontak Masuk Terkini' : 'Recent Inquiries'}</span>
            </h3>
            <Link
              href={`/${locale}/admin/inquiries`}
              className="text-xs font-semibold text-covenant-700 hover:text-covenant-900"
            >
              {dict.common.viewAll} &rarr;
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">
              {locale === 'id' ? 'Belum ada pesan kontak masuk.' : 'No inquiries yet.'}
            </p>
          ) : (
            <div className="space-y-3">
              {recentInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/80 transition-colors flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="font-semibold text-slate-900 flex items-center gap-2">
                      <span>{inq.name}</span>
                      <span className="text-[10px] text-slate-500">({inq.email})</span>
                      {inq.status === 'NEW' && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="text-slate-700 font-medium">{inq.subject}</div>
                    <div className="text-slate-500 line-clamp-1">{inq.message}</div>
                  </div>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recent Content Items */}
        <section className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-covenant-600" />
              <span>{locale === 'id' ? 'Konten Terakhir Ditambahkan' : 'Recent Content'}</span>
            </h3>
            <Link
              href={`/${locale}/admin/content`}
              className="text-xs font-semibold text-covenant-700 hover:text-covenant-900"
            >
              {dict.common.viewAll} &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {recentContent.map((item) => {
              const trans = item.translations.find((t) => t.locale === locale) || item.translations[0];
              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/80 transition-colors flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-covenant-100 text-covenant-800">
                        {item.type}
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase">{item.status}</span>
                    </div>
                    <div className="font-semibold text-slate-900 truncate">
                      {trans?.title || 'Untitled'}
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400 whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
