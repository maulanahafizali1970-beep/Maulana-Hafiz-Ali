'use client';

import Link from 'next/link';
import { MessageCircle, Phone, Shield } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import ConsultationForm from './ConsultationForm';

interface HeroSectionProps {
  lang?: 'en' | 'ar';
}

export default function HeroSection({ lang = 'en' }: HeroSectionProps) {
  const isRtl = lang === 'ar';

  return (
    <section className="bg-soft-cream" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="space-y-6">
            <span className="inline-block text-subtle-gold font-medium text-sm md:text-base tracking-wider uppercase">
              Confidential Guidance for Difficult Relationships
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-forest leading-tight">
              Islamic Spiritual Guidance for Love, Marriage and Family Problems
            </h1>
            <p className="text-dark-text/80 text-base md:text-lg leading-relaxed">
              Receive respectful and confidential guidance for misunderstandings, separation,
              marriage difficulties, family opposition, emotional pain and spiritual concerns.
              Maulana Hafiz Ali provides faith-based support to help you approach your situation
              with patience, clarity and dignity.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-deep-emerald hover:bg-dark-forest text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Consult on WhatsApp
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-deep-emerald text-deep-emerald hover:bg-deep-emerald hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Phone className="w-5 h-5" />
                Request a Call Back
              </Link>
            </div>
            <div className="flex items-center gap-2 text-sm text-dark-text/60">
              <Shield className="w-4 h-4 text-subtle-gold" />
              <span>Private Consultation &bull; Arabic &amp; English Support &bull; Worldwide Availability</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative w-full aspect-[3/4] max-w-sm mx-auto rounded-xl overflow-hidden border-2 border-subtle-gold/20 shadow-lg bg-gradient-to-br from-deep-emerald via-medium-green to-dark-forest">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white/80 p-6">
                  <div className="w-24 h-24 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="font-medium">Maulana Hafiz Ali</p>
                  <p className="text-sm text-white/60">Islamic Spiritual Guide</p>
                </div>
              </div>
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
