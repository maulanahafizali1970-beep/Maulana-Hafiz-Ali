import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MessageCircle, Phone, ArrowLeft } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTASection from '@/components/CTASection';
import { services } from '@/data/services';
import { getWhatsAppUrl, getServiceMessage } from '@/lib/whatsapp';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.excerpt,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const whatsappUrl = getWhatsAppUrl(getServiceMessage(service.title));

  return (
    <>
      <section className="bg-soft-cream border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: service.title },
            ]}
          />
        </div>
      </section>

      <section className="bg-warm-ivory py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-subtle-gold hover:text-deep-emerald text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Services
              </Link>
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
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={whatsappUrl}
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

            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border-2 border-subtle-gold/20 shadow-lg bg-gradient-to-br from-deep-emerald via-medium-green to-dark-forest">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
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
                  href={`/services/${s.slug}`}
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
        text="Speak with Maulana Hafiz Ali about your concerns through a confidential online consultation."
        availability="Arabic and English consultations available."
      />
    </>
  );
}
