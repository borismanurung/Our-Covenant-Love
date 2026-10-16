import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import ContactForm from '@/components/ContactForm';
import PhotoFrame from '@/components/PhotoFrame';
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Sparkles,
  Share2,
  Heart,
  ExternalLink,
} from 'lucide-react';

export default async function ContactPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const dict = getDictionary(locale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-covenant-100 border border-covenant-300 text-covenant-900 text-xs font-semibold uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5 text-covenant-600" />
          <span>{locale === 'id' ? 'Komunikasi & Persekutuan' : 'Connect & Fellowship'}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
          {dict.contact.title}
        </h1>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
          {dict.contact.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Contact Details & Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-covenant-50/70 border border-covenant-200/80 rounded-3xl p-8 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              {dict.contact.officeTitle}
            </h2>

            <div className="space-y-5 text-sm text-slate-700">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-covenant-100 text-covenant-800 flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-covenant-700" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-covenant-800 block">
                    {locale === 'id' ? 'Alamat Kantor' : 'Office Address'}
                  </span>
                  <p className="text-slate-800 font-medium mt-0.5">
                    {dict.contact.officeAddress}
                  </p>
                </div>
              </div>

              {/* Contact Person / Phone */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-covenant-100 text-covenant-800 flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5 text-covenant-700" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-covenant-800 block">
                    {locale === 'id' ? 'Kontak & WhatsApp' : 'Phone & WhatsApp'}
                  </span>
                  <p className="text-slate-800 font-medium mt-0.5">
                    {dict.contact.contactPerson}
                  </p>
                  <a
                    href="https://api.whatsapp.com/send?phone=6281586418641"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold hover:text-emerald-800 mt-1"
                  >
                    <span>{locale === 'id' ? 'Chat WhatsApp Langsung' : 'Direct WhatsApp Chat'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-covenant-100 text-covenant-800 flex-shrink-0 mt-0.5">
                  <Share2 className="w-5 h-5 text-covenant-700" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-covenant-800 block">
                    {locale === 'id' ? 'Media Sosial' : 'Social Channels'}
                  </span>
                  <p className="text-slate-800 font-medium mt-0.5">
                    Instagram, TikTok, Facebook
                  </p>
                  <span className="text-xs text-covenant-700 font-semibold">
                    @OurCovenantLove
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Welcoming Nuance Photo */}
          <div className="w-full">
            <PhotoFrame
              src="/images/family/boris-wife-25years.jpg"
              alt={locale === 'id' ? 'Pelayanan Our Covenant Love' : 'Our Covenant Love Ministry'}
              locale={locale}
              aspectRatio="landscape"
            />
          </div>

          {/* Ministry Pastoral Promise */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2 text-covenant-800 font-serif font-bold text-lg">
              <Heart className="w-5 h-5 text-covenant-600 fill-current" />
              <h3>{locale === 'id' ? 'Kerahasiaan & Dukungan Doa' : 'Confidentiality & Prayer Support'}</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {locale === 'id'
                ? 'Setiap permohonan konseling, undangan seminar, atau pokok doa yang Anda kirimkan diperlakukan dengan penuh kerahasiaan dan didoakan secara khusus oleh tim pastoral kami.'
                : 'Every counseling inquiry, seminar invitation, or prayer request submitted is treated with absolute confidentiality and held in prayer by our pastoral team.'}
            </p>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm locale={locale} dict={dict} />
        </div>
      </div>
    </div>
  );
}
