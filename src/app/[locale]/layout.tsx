import { notFound } from 'next/navigation';
import { Locale, isValidLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export async function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50/40">
      <Navbar locale={locale} dict={dict} />
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 xl:pl-72">
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} />
      </div>
    </div>
  );
}
