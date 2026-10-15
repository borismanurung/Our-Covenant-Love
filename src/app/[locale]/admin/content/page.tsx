import { Locale } from '@/i18n/config';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { getSessionUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminNav from '@/components/AdminNav';
import ContentManager from '@/components/ContentManager';

export default async function AdminContentPage({
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

  const items = await prisma.contentItem.findMany({
    include: {
      translations: true,
      categories: true,
      tags: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <AdminNav locale={locale} user={user} />

      <div className="space-y-1">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
          {locale === 'id' ? 'Manajemen Konten Pelayanan' : 'Ministry Content Management'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {locale === 'id'
            ? 'Kelola artikel, khotbah video, lagu orisinal, dan acara konferensi secara bilingual.'
            : 'Manage bilingual articles, sermons, songs, and ministry events.'}
        </p>
      </div>

      <ContentManager locale={locale} initialItems={items} />
    </div>
  );
}
