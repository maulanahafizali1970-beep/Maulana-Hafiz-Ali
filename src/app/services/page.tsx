import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import ServiceCard from '@/components/ServiceCard';
import CTASection from '@/components/CTASection';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore Islamic spiritual guidance services including wazifa, court case solutions, vashikaran-related concerns, buried wealth, business obstacles, jobs and children problems, family disputes and more.',
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-soft-cream border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services' },
            ]}
          />
        </div>
      </section>

      <section className="bg-warm-ivory py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-dark-forest mb-4">
              Guidance Services
            </h1>
            <p className="text-dark-text/70 text-lg">
              Only you will get the solution to your problems over a phone call. A problem of
              any kind is rooted out in just three hours. Every situation is treated with privacy
              and respect.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                excerpt={service.excerpt}
                slug={service.slug}
                iconName={service.icon}
                image={service.image}
                disclaimer={service.disclaimer}
                featured={service.featured}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Need Help Choosing a Service?"
        text="If you are unsure which service is right for your situation, send a message and we will guide you to the appropriate support."
        availability="Arabic and English consultations available."
      />
    </>
  );
}
