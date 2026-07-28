import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import TestimonialCard from '@/components/TestimonialCard';
import CTASection from '@/components/CTASection';
import { testimonials } from '@/data/testimonials';

export const metadata: Metadata = {
  title: 'Testimonials',
  description:
    'Read experiences from clients who have received confidential Islamic spiritual and relationship guidance from Maulana Hafiz Ali.',
};

export default function TestimonialsPage() {
  return (
    <>
      <section className="bg-soft-cream border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Testimonials' },
            ]}
          />
        </div>
      </section>

      <section className="bg-warm-ivory py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-dark-forest mb-4">
              Client Experiences
            </h1>
            <p className="text-dark-text/70 text-lg">
              Hear from individuals who have received confidential guidance for their relationship
              and personal concerns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <TestimonialCard
                key={t.id}
                name={t.name}
                location={t.location}
                text={t.text}
                isSample={t.isSample}
              />
            ))}
          </div>

          <div className="mt-12 p-6 bg-soft-cream rounded-xl border border-light-border max-w-3xl mx-auto">
            <h2 className="text-lg font-bold text-dark-forest mb-3">
              Important Note About Testimonials
            </h2>
            <p className="text-dark-text/70 text-sm leading-relaxed">
              The testimonials shown on this page are sample placeholders and should be replaced
              with verified client feedback before publication. Individual experiences with
              spiritual and relationship guidance vary. Testimonials on this website do not
              represent a guarantee of specific results or outcomes. Each situation is unique,
              and guidance is provided based on individual circumstances.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        heading="Begin Your Confidential Consultation"
        text="Take the first step toward clarity and peace of mind. Your consultation is private and handled with respect and discretion."
        availability="Arabic and English consultations available."
      />
    </>
  );
}
