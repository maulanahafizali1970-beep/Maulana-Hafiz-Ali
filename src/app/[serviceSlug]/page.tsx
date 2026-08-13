import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTASection from '@/components/CTASection';
import { services } from '@/data/services';

const allowedSlugs = services.map((s) => s.slug);

interface Props {
  params: Promise<{ serviceSlug: string }>;
}

export async function generateStaticParams() {
  return allowedSlugs.map((slug) => ({ serviceSlug: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.excerpt,
  };
}

export default async function ServiceLandingPage({ params }: Props) {
  const { serviceSlug } = await params;
  const service = services.find((s) => s.slug === serviceSlug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <section className="bg-soft-cream border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: service.title },
            ]}
          />
        </div>
      </section>

      <section className="bg-warm-ivory py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              {service.featured && (
                <span className="inline-block bg-subtle-gold text-dark-forest font-bold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full">
                  ★ Featured — Most Trusted Service
                </span>
              )}
              <span className="inline-block text-subtle-gold font-medium text-sm tracking-wider uppercase">
                Islamic Guidance Service
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-dark-forest">
                {service.title}
              </h1>
              <p className="text-dark-text/80 text-lg leading-relaxed">
                {service.description}
              </p>
              {service.disclaimer && (
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                  <p className="text-amber-800 text-sm">{service.disclaimer}</p>
                </div>
              )}

              <div className="bg-soft-cream border border-light-border rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-dark-forest">How This Service Helps</h2>
                <ul className="space-y-2">
                  {[
                    'Confidential and private consultation',
                    'Guidance available in English and Arabic',
                    'Faith-based and practical advice',
                    'Respectful and understanding approach',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-dark-text/80">
                      <svg className="w-5 h-5 text-medium-green flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="#contact-form"
                  className="inline-flex items-center gap-2 bg-deep-emerald hover:bg-dark-forest text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <PhoneCall className="w-5 h-5" />
                  Submit Your Details
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 border-2 border-deep-emerald text-deep-emerald hover:bg-deep-emerald hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  View All Services
                </Link>
              </div>
            </div>

            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border-2 border-subtle-gold/20 shadow-lg bg-gradient-to-br from-deep-emerald via-medium-green to-dark-forest">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white/80 p-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4">
                    <PhoneCall className="w-10 h-10 text-white/60" />
                  </div>
                  <p className="font-medium text-lg">{service.title}</p>
                  <p className="text-sm text-white/60 mt-1">Confidential Guidance Over a Phone Call</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-soft-cream py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-dark-forest text-center mb-8">
            Other Services You May Need
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services
              .filter((s) => s.slug !== service.slug)
              .slice(0, 3)
              .map((s) => (
                <Link
                  key={s.id}
                  href={`/${s.slug}`}
                  className="p-6 bg-warm-ivory border border-light-border rounded-lg hover:border-subtle-gold transition-colors group"
                >
                  <h3 className="font-bold text-dark-forest group-hover:text-deep-emerald transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-dark-text/70 mt-2">{s.excerpt}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Discuss Your Situation Privately"
        text="Only you will get the solution to your problems over a phone call. Submit your details and be contacted from any corner of the world."
        availability="Arabic and English consultations available."
      />
    </>
  );
}
