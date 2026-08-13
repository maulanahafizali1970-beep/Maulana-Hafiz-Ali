'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import ConsultationForm from './ConsultationForm';

interface HeroSectionProps {
  lang?: 'en' | 'ar';
}

export default function HeroSection({ lang = 'en' }: HeroSectionProps) {
  const isRtl = lang === 'ar';
  const t = lang === 'ar' ? {
    subtitle: 'الحل لمشكلتك عبر مكالمة هاتفية',
    heading: 'إرشاد روحي إسلامي لحل أي مشكلة من أي مكان في العالم',
    description: 'قضايا المحاكم، عوائق الأعمال، مشاكل الأبناء، النزاعات العائلية، السلام المنزلي، والمشاكل الشخصية — أي نوع من المشاكل يُستأصل حله خلال ثلاث ساعات. شارك تفاصيلك وسيتم التواصل معك عبر مكالمة هاتفية سرية.',
    submitBtn: 'أرسل تفاصيلك الآن',
    servicesBtn: 'تصفح الخدمات',
    privacyTag: 'استشارة خاصة • حل خلال ثلاث ساعات • متاح عالمياً',
  } : {
    subtitle: 'The Solution to Your Problem Over a Phone Call',
    heading: 'Islamic Spiritual Guidance to Resolve Any Problem from Any Corner of the World',
    description: 'Court cases, business obstacles, jobs and children problems, family disputes, domestic peace, buried wealth and personal difficulties — a problem of any kind is rooted out in just three hours. Submit your details and you will be contacted for a confidential phone consultation.',
    submitBtn: 'Submit Your Details',
    servicesBtn: 'View All Services',
    privacyTag: 'Private Consultation • Solution in Just Three Hours • Worldwide Availability',
  };

  return (
    <section className="bg-soft-cream" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="space-y-6">
            <span className="inline-block text-subtle-gold font-medium text-sm md:text-base tracking-wider uppercase">
              {t.subtitle}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-forest leading-tight">
              {t.heading}
            </h1>
            <p className="text-dark-text/80 text-base md:text-lg leading-relaxed">
              {t.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#contact-form"
                className="inline-flex items-center gap-2 bg-deep-emerald hover:bg-dark-forest text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {t.submitBtn}
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 border-2 border-deep-emerald text-deep-emerald hover:bg-deep-emerald hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {t.servicesBtn}
              </Link>
            </div>
            <div className="flex items-center gap-2 text-sm text-dark-text/60">
              <Shield className="w-4 h-4 text-subtle-gold" />
              <span>{t.privacyTag}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-subtle-gold/30 shadow-lg bg-gradient-to-br from-deep-emerald via-medium-green to-dark-forest flex items-center justify-center">
              <Image
                src="/images/maulana.png"
                alt="Maulana Hafiz Ali"
                width={300}
                height={300}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            <div className="bg-warm-ivory border border-light-border rounded-xl p-6 shadow-sm">
              <ConsultationForm lang={lang} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
