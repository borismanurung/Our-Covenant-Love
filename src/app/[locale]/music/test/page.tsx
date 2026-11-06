import AudioPlayer from '@/components/AudioPlayer';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict: any = getDictionary(locale);
  return { title: `${dict.common.test} | ${dict.music.title}` };
}

export default async function TestMusicPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict: any = getDictionary(locale);
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">{dict.music.title} – Test Audio</h1>
      <AudioPlayer src="/audio/sample.mp3" title="Test Audio" locale={locale} />
    </div>
  );
}
