import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle, Phone, Shield, CheckCircle } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'About Maulana Hafiz Ali',
  description:
    'Learn about Maulana Hafiz Ali, an Islamic Spiritual Guide providing confidential relationship and spiritual guidance to clients worldwide in English and Arabic.',
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-soft-cream border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'About Maulana Hafiz Ali' },
            ]}
          />
        </div>
      </section>

      <section className="bg-warm-ivory py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative w-full aspect-[3/4] max-w-sm mx-auto rounded-xl overflow-hidden border-2 border-subtle-gold/20 shadow-lg bg-gradient-to-br from-deep-emerald via-medium-green to-dark-forest">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white/80 p-6">
                  <div className="w-24 h-24 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="font-bold text-lg">Maulana Hafiz Ali</p>
                  <p className="text-sm text-white/60">Islamic Spiritual Guide</p>
                  <p className="text-sm text-white/60 mt-1">Love and Marriage Consultant</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-dark-forest">
                About Maulana Hafiz Ali
              </h1>
              <div className="space-y-4 text-dark-text/80 leading-relaxed">
                <p>
                  Maulana Hafiz Ali provides confidential spiritual and relationship guidance
                  for individuals and families facing love, marriage, family and personal-life
                  difficulties. His approach combines faith-based support, dua guidance, emotional
                  understanding and practical relationship advice.
                </p>
                <p>
                  Every consultation is private and tailored to the individual. The purpose of the
                  guidance is not to control another person or guarantee outcomes, but to help clients
                  gain clarity, understand their circumstances and make thoughtful decisions.
                </p>
                <p>
                  With experience supporting clients from diverse backgrounds across the Middle East,
                  Asia, Europe and North America, Maulana Hafiz Ali offers guidance that is respectful
                  of each person's cultural context and personal beliefs.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-dark-forest">What to Expect</h2>
                {[
                  'Confidential one-to-one consultation',
                  'Guidance available in English and Arabic',
                  'Support for clients worldwide',
                  'Respectful and non-judgmental communication',
                  'Personalized guidance for every situation',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-medium-green flex-shrink-0 mt-0.5" />
                    <span className="text-dark-text/80">{point}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
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
            </div>
          </div>
        </div>
      </section>

      <section className="bg-soft-cream py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-dark-forest text-center mb-8">
              Areas of Guidance
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Love & Relationship Guidance',
                  desc: 'Support for misunderstandings, communication problems, trust issues and emotional distance between partners.',
                },
                {
                  title: 'Marriage & Family Guidance',
                  desc: 'Private support for husband-wife conflicts, family opposition, separation concerns and family harmony.',
                },
                {
                  title: 'Spiritual & Emotional Support',
                  desc: 'Faith-based guidance for emotional healing, spiritual concerns and finding peace during difficult times.',
                },
              ].map((area) => (
                <div
                  key={area.title}
                  className="p-6 bg-warm-ivory border border-light-border rounded-lg"
                >
                  <h3 className="text-lg font-bold text-dark-forest mb-3">{area.title}</h3>
                  <p className="text-dark-text/70 text-sm">{area.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-deep-emerald py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-warm-ivory mb-4">
            Begin Your Confidential Consultation
          </h2>
          <p className="text-soft-cream/80 max-w-2xl mx-auto mb-8">
            Take the first step toward clarity and peace of mind. Your consultation is private
            and handled with respect and discretion.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-subtle-gold hover:bg-amber-600 text-dark-forest px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Now
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-warm-ivory text-warm-ivory hover:bg-warm-ivory hover:text-dark-forest px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Phone className="w-5 h-5" />
              Request a Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
