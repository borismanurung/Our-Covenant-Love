import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { getContentBySlug, getContentList } from '@/services/content.service';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Music, FileText, User, Heart, Sparkles, ExternalLink } from 'lucide-react';
import AudioPlayer from '@/components/AudioPlayer';
import ShareButtons from '@/components/ShareButtons';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const { locale, slug } = params;
  const item = await getContentBySlug(locale, slug);
  if (!item) return { title: 'Song Not Found' };

  return {
    title: `${item.translation.title} | Our Covenant Love Music`,
    description: item.translation.excerpt || undefined,
  };
}

export default async function SongDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const { locale, slug } = params;
  const dict = getDictionary(locale);

  const item = await getContentBySlug(locale, slug);
  if (!item || item.type !== 'SONG') {
    notFound();
  }

  const { translation } = item;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Back Link */}
      <Link
        href={`/${locale}/music`}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-covenant-700 hover:text-covenant-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{dict.common.backToList}</span>
      </Link>

      {/* Header Info */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-covenant-100 text-covenant-800 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 text-covenant-600 fill-current" />
            <span>Original Worship Music</span>
          </span>
          {item.isFeatured && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Featured</span>
            </span>
          )}
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
          {translation.title}
        </h1>

        {item.author && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <User className="w-4 h-4 text-covenant-600" />
            <span>{dict.common.author}: <strong>{item.author}</strong></span>
          </div>
        )}
      </header>

      {/* Audio Player Card */}
      {item.audioUrl && (
        <section className="space-y-2">
          <AudioPlayer src={item.audioUrl} title={translation.title} />
        </section>
      )}

      {/* Story Behind the Song */}
      {translation.songStory && (
        <section className="bg-covenant-50/70 border border-covenant-200 rounded-3xl p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 text-covenant-800 font-serif font-bold text-xl">
            <Sparkles className="w-5 h-5 text-covenant-600" />
            <h2>{dict.music.storyTitle}</h2>
          </div>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic whitespace-pre-line">
            {translation.songStory}
          </p>
        </section>
      )}

      {/* Lyrics & Chords Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Lyrics */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Music className="w-5 h-5 text-covenant-600" />
            <h2 className="font-serif font-bold text-lg text-slate-900">
              {dict.music.lyricsTitle}
            </h2>
          </div>
          <div className="whitespace-pre-line text-sm sm:text-base text-slate-700 font-serif leading-loose">
            {translation.lyrics || translation.body}
          </div>
        </section>

        {/* Chord Sheet */}
        {item.chordSheet && (
          <section className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-covenant-400" />
                <h2 className="font-mono font-bold text-sm tracking-wider uppercase text-covenant-300">
                  {dict.music.chordsTitle}
                </h2>
              </div>
            </div>
            <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm text-covenant-100 bg-slate-950/70 p-4 rounded-xl overflow-x-auto leading-relaxed border border-slate-800/80">
              {item.chordSheet}
            </pre>
          </section>
        )}
      </div>

      {/* Copyright Notice */}
      <div className="text-center text-xs text-slate-500 py-3 border-y border-slate-200">
        {dict.music.copyrightNotice}
      </div>

      {/* Share and Back */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ShareButtons title={translation.title} />

        <Link
          href={`/${locale}/music`}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{dict.common.viewAll}</span>
        </Link>
      </div>
    </div>
  );
}
