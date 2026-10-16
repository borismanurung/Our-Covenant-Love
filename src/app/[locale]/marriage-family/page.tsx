import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import Link from 'next/link';
import Image from 'next/image';
import PhotoFrame from '@/components/PhotoFrame';
import {
  Heart,
  Shield,
  BookOpen,
  Sparkles,
  Users,
  Compass,
  Flame,
  MessageCircle,
  HelpCircle,
  ArrowRight,
  Anchor,
} from 'lucide-react';

export default async function MarriageFamilyPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const dict = getDictionary(locale);

  const topicIcons: Record<string, any> = {
    covenant: Shield,
    emotional: Heart,
    spiritual: Flame,
    communication: MessageCircle,
    forgiveness: Anchor,
    conflict: Compass,
    parenting: Users,
    growth: BookOpen,
  };

  const topicScriptures: Record<string, { id: string; en: string }> = {
    covenant: {
      id: 'Maleakhi 2:14; Kejadian 2:24',
      en: 'Malachi 2:14; Genesis 2:24',
    },
    emotional: {
      id: '1 Petrus 3:7; Efesus 4:32',
      en: '1 Peter 3:7; Ephesians 4:32',
    },
    spiritual: {
      id: 'Yosua 24:15; Matius 18:19-20',
      en: 'Joshua 24:15; Matthew 18:19-20',
    },
    communication: {
      id: 'Yakobus 1:19; Amsal 15:1',
      en: 'James 1:19; Proverbs 15:1',
    },
    forgiveness: {
      id: 'Kolose 3:13; Efesus 4:31-32',
      en: 'Colossians 3:13; Ephesians 4:31-32',
    },
    conflict: {
      id: 'Roma 12:18; Amsal 16:32',
      en: 'Romans 12:18; Proverbs 16:32',
    },
    parenting: {
      id: 'Ulangan 6:6-9; Amsal 22:6',
      en: 'Deuteronomy 6:6-9; Proverbs 22:6',
    },
    growth: {
      id: 'Mazmur 78:4-7; 2 Petrus 3:18',
      en: 'Psalm 78:4-7; 2 Peter 3:18',
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* 1. Header Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-covenant-100 to-royalPurple-100 border border-covenant-200 text-covenant-900 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-royalPurple-600" />
          <span>{dict.common.tagline}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
          {dict.marriageFamily.title}
        </h1>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
          {dict.marriageFamily.subtitle}
        </p>
      </div>

      {/* Real Covenant Life Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xs">
        <div className="lg:col-span-5">
          <PhotoFrame
            src="/images/family/boris-wife-blue-purple.jpg"
            alt={locale === 'id' ? 'Boris Manurung & Istri' : 'Boris Manurung & Wife'}
            aspectRatio="portrait"
            locale={locale}
          />
        </div>
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-covenant-100 to-royalPurple-100 border border-covenant-200 text-covenant-900 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 text-royalPurple-600 fill-current" />
            <span>{locale === 'id' ? 'Bukan Sekadar Teori, Tapi Perjalanan Nyata' : 'Not Merely Theory, but a Lived Reality'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 leading-tight">
            {locale === 'id'
              ? 'Pernikahan yang Memancarkan Karakter Allah'
              : 'Marriage that Reflects the Character of God'}
          </h2>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            {locale === 'id'
              ? 'Ketika kita berjanji di hadapan altar Allah, kita tidak menandatangani kontrak kerja sama bisnis yang bisa dibatalkan saat salah satu pihak mengecewakan. Kovenan adalah janji kudus di hadapan Allah yang bersedia mengasihi seperti Kristus mengasihi jemaat-Nya—mengorbankan diri, memulihkan yang terluka, dan memilih pengampunan setiap hari.'
              : 'When we take vows before God’s altar, we are not signing a commercial contract dissolvable when someone disappoints. A covenant is a sacred oath before God to love as Christ loved the church—sacrificing self, binding up wounds, and choosing forgiveness daily.'}
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <div className="px-4 py-2.5 rounded-xl bg-covenant-50 border border-covenant-200/80 text-covenant-900 text-xs font-medium">
              ✨ <strong>{locale === 'id' ? 'Maleakhi 2:14' : 'Malachi 2:14'}</strong> — {locale === 'id' ? 'Pasangan kovenan hidupmu' : 'Your covenant companion for life'}
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-royalPurple-50 border border-royalPurple-200/80 text-royalPurple-900 text-xs font-medium">
              🕊️ <strong>{locale === 'id' ? 'Efesus 5:31–32' : 'Ephesians 5:31–32'}</strong> — {locale === 'id' ? 'Misteri kasih Kristus' : 'The sacred mystery of Christ’s love'}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Covenant vs Contract Comparison */}
      <section className="bg-gradient-to-br from-covenant-900 via-covenant-950 to-navy-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-covenant-800">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-covenant-300">
            {locale === 'id' ? 'Fondasi Teologis' : 'Theological Foundation'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-white">
            {locale === 'id'
              ? 'Kontrak Duniawi vs. Kovenan Ilahi'
              : 'Worldly Contract vs. Divine Covenant'}
          </h2>
          <p className="text-sm sm:text-base text-covenant-200/90 mt-2">
            {locale === 'id'
              ? 'Pernikahan bukanlah kesepakatan 50/50 yang didasarkan pada rasa saling menguntungkan, melainkan persekutuan 100/100 yang dimeteraikan di hadapan Allah.'
              : 'Marriage is not a 50/50 mutual deal conditioned on feelings, but a 100/100 unconditional covenant sealed before Almighty God.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs space-y-3">
            <div className="flex items-center gap-2 text-rose-300 font-semibold text-sm">
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              <span>{locale === 'id' ? 'Kontrak Duniawi' : 'Worldly Contract'}</span>
            </div>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-2 list-disc list-inside">
              <li>{locale === 'id' ? 'Didasarkan pada syarat dan keuntungan timbal balik' : 'Based on conditions and mutual convenience'}</li>
              <li>{locale === 'id' ? 'Berorientasi pada "Apa yang bisa aku dapatkan?"' : 'Oriented toward "What do I get out of this?"'}</li>
              <li>{locale === 'id' ? 'Bisa dibatalkan saat perasaan cinta pudar' : 'Can be terminated when emotional feelings fade'}</li>
              <li>{locale === 'id' ? 'Melindungi hak-hak ego pribadi' : 'Protects individual rights and personal ego'}</li>
            </ul>
          </div>

          <div className="bg-covenant-500/10 border border-covenant-400/30 rounded-2xl p-6 backdrop-blur-xs space-y-3">
            <div className="flex items-center gap-2 text-covenant-300 font-semibold text-sm">
              <span className="w-2 h-2 rounded-full bg-covenant-400"></span>
              <span>{locale === 'id' ? 'Kovenan Ilahi (Alkitabiah)' : 'Divine Covenant (Biblical)'}</span>
            </div>
            <ul className="text-xs sm:text-sm text-covenant-100 space-y-2 list-disc list-inside">
              <li>{locale === 'id' ? 'Didasarkan pada kesetiaan janji seumur hidup di hadapan Allah' : 'Based on lifelong promise and loyalty before God'}</li>
              <li>{locale === 'id' ? 'Berorientasi pada "Bagaimana aku dapat mengasihi & melayani?"' : 'Oriented toward "How can I sacrificial love & serve?"'}</li>
              <li>{locale === 'id' ? 'Kekal dan tidak tergoyahkan oleh pasang surut emosi' : 'Enduring and unshaken by emotional highs and lows'}</li>
              <li>{locale === 'id' ? 'Memancarkan persatuan Kristus dan jemaat-Nya (Efesus 5)' : 'Reflects Christ and His Church (Ephesians 5)'}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Core Pillars / Topics Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {locale === 'id' ? 'Pilar-Pilar Pembinaan Kovenan' : 'Pillars of Covenant Formation'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            {locale === 'id'
              ? 'Delapan aspek penting yang kami bina secara mendalam untuk mewujudkan keluarga yang kokoh dan memancarkan kemuliaan Tuhan.'
              : 'Eight essential areas we cultivate deeply to build steadfast families that reflect God’s glory.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dict.marriageFamily.topics.map((topic) => {
            const Icon = topicIcons[topic.id] || Heart;
            const scripture = topicScriptures[topic.id]?.[locale] || '';

            return (
              <div
                key={topic.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 hover:shadow-md hover:border-covenant-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-covenant-100 text-covenant-800 flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6 text-covenant-700" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    {topic.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {topic.desc}
                  </p>
                </div>

                {scripture && (
                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-mono font-medium text-covenant-800 bg-covenant-50 px-2 py-1 rounded">
                      {scripture}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Ambient Family Nuance Photo */}
      <div className="relative">
        <PhotoFrame
          src="/images/family/family-full-studio.jpg"
          alt={locale === 'id' ? 'Keluarga Kovenan' : 'Covenant Family'}
          aspectRatio="wide"
          locale={locale}
        />
      </div>

      {/* 4. Practical Roadmap for Couples */}
      <section className="bg-covenant-50 border border-covenant-200 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-covenant-700">
            {locale === 'id' ? 'Langkah Praktis Harian' : 'Daily Practical Steps'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            {locale === 'id'
              ? 'Ritme Rohani Pasangan Suami-Istri'
              : 'Spiritual Rhythms for Husband & Wife'}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {locale === 'id'
              ? 'Kebiasaan-kebiasaan kecil yang konsisten membangun ketahanan kovenan Anda menghadapi badai kehidupan.'
              : 'Consistent small daily habits that build resilient covenant foundations through life’s storms.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-covenant-200/70 shadow-xs space-y-2">
            <div className="text-covenant-600 font-serif font-bold text-2xl">01</div>
            <h3 className="font-semibold text-slate-900 text-base">
              {locale === 'id' ? 'Doa Bersama Harian' : 'Daily Couple Prayer'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {locale === 'id'
                ? 'Luangkan minimal 5-10 menit setiap hari untuk memegang tangan pasangan dan berdoa bagi satu sama lain.'
                : 'Spend 5-10 minutes each day holding hands and bringing each other before the Throne of Grace.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-covenant-200/70 shadow-xs space-y-2">
            <div className="text-covenant-600 font-serif font-bold text-2xl">02</div>
            <h3 className="font-semibold text-slate-900 text-base">
              {locale === 'id' ? 'Meja Percakapan & Kejujuran' : 'Heart-to-Heart Listening'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {locale === 'id'
                ? 'Mendengarkan tanpa membela diri, memberi ruang aman bagi pasangan mengungkapkan rasa takut dan harapan.'
                : 'Listening without defensiveness, offering a safe haven for your spouse to share vulnerabilities.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-covenant-200/70 shadow-xs space-y-2">
            <div className="text-covenant-600 font-serif font-bold text-2xl">03</div>
            <h3 className="font-semibold text-slate-900 text-base">
              {locale === 'id' ? 'Pengampunan Tanpa Menunda' : 'Prompt Forgiveness'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {locale === 'id'
                ? 'Jangan biarkan matahari terbenam sebelum membereskan kemarahan (Efesus 4:26), lepaskan anugerah Kristus.'
                : 'Do not let the sun go down on your anger (Ephesians 4:26), extending the forgiving grace of Christ.'}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Call to Action */}
      <section className="text-center bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
          {locale === 'id'
            ? 'Ingin Mendalami Lebih Jauh Bersama Kami?'
            : 'Want to Walk Further With Us?'}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          {locale === 'id'
            ? 'Jelajahi artikel renungan kovenan, tonton khotbah pengajaran, atau hubungi kami untuk seminar di gereja Anda.'
            : 'Explore covenant devotionals, watch video teachings, or connect with our ministry for seminars in your church.'}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={`/${locale}/articles`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-covenant-700 hover:bg-covenant-800 text-white font-medium text-sm transition-colors shadow-sm"
          >
            <span>{dict.common.articles}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={`/${locale}/sermons`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-sm transition-colors"
          >
            <span>{dict.common.sermons}</span>
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-covenant-400 text-covenant-800 hover:bg-covenant-50 font-medium text-sm transition-colors"
          >
            <span>{dict.common.contact}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
