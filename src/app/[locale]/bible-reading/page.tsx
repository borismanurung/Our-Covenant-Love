import { Metadata } from 'next';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import BibleReadingView from '@/components/BibleReadingView';

interface BibleReadingPageProps {
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({ params }: BibleReadingPageProps): Promise<Metadata> {
  const { locale } = params;
  const dict = getDictionary(locale);
  const isId = locale === 'id';

  return {
    title: isId ? 'Rencana Baca Alkitab 1 Tahun' : 'Bible in a Year Reading Plan',
    description: isId
      ? 'Jelajahi seluruh 66 kitab dari Kejadian hingga Wahyu dalam 365 hari. Temukan kesinambungan firman Allah dan kasih kovenan-Nya setiap hari.'
      : 'Journey through all 66 books from Genesis to Revelation across 365 days. Discover God’s redemptive covenant and steadfast love daily.',
    openGraph: {
      title: isId ? 'Rencana Baca Alkitab 1 Tahun | Our Covenant Love' : 'Bible in a Year Reading Plan | Our Covenant Love',
      description: isId
        ? 'Jelajahi seluruh 66 kitab dari Kejadian hingga Wahyu dalam 365 hari.'
        : 'Journey through all 66 books from Genesis to Revelation across 365 days.',
      type: 'website',
    },
  };
}

export default async function BibleReadingPage({ params }: BibleReadingPageProps) {
  const { locale } = params;
  const dict = getDictionary(locale);

  return (
    <div className="min-h-screen bg-gradient-to-b from-covenant-50/40 via-white to-slate-50">
      <BibleReadingView locale={locale} dict={dict} />
    </div>
  );
}
