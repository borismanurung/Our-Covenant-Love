import { Locale } from '@/i18n/config';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { getSessionUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminNav from '@/components/AdminNav';
import InquiriesManager from '@/components/InquiriesManager';

export default async function AdminInquiriesPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('ocl_session')?.value;
  const user = await getSessionUser(sessionToken);

  if (!user) {
    redirect(`/${locale}/admin/login`);
  }

  const inquiries = await prisma.contactInquiry.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <AdminNav locale={locale} user={user} />

      <div className="space-y-1">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
          {locale === 'id' ? 'Kotak Masuk Pesan & Doa' : 'Inquiries & Prayer Requests Inbox'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {locale === 'id'
            ? 'Tinjau dan tanggapi pesan yang dikirimkan oleh jemaat dan keluarga melalui formulir kontak.'
            : 'Review and respond to messages submitted through the contact form.'}
        </p>
      </div>

      <InquiriesManager locale={locale} initialInquiries={inquiries} />
    </div>
  );
}
