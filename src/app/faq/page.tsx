import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQAccordion from '@/components/FAQAccordion';
import CTASection from '@/components/CTASection';
import { faqs } from '@/data/faqs';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Find answers to common questions about Islamic spiritual and relationship guidance, confidentiality, languages, fees and more.',
};

export default function FAQPage() {
  return (
    <>
      <section className="bg-soft-cream border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Frequently Asked Questions' },
            ]}
          />
        </div>
      </section>

      <section className="bg-warm-ivory py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-dark-forest mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-dark-text/70 text-lg">
            Common questions about Islamic spiritual and relationship guidance, confidentiality,
            consultation process and more.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      <section className="bg-soft-cream py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-dark-forest mb-4">
              Still Have Questions?
            </h2>
            <p className="text-dark-text/70 mb-8">
              If you did not find the answer you were looking for, please reach out directly.
              We are here to help.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-deep-emerald hover:bg-dark-forest text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Ask on WhatsApp
              </a>
              <a
                href="mailto:contact@maulanahafizali.com"
                className="inline-flex items-center gap-2 border-2 border-deep-emerald text-deep-emerald hover:bg-deep-emerald hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Send an Email
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        heading="Ready to Discuss Your Situation?"
        text="Receive confidential guidance tailored to your specific circumstances."
        availability="Arabic and English consultations available."
      />
    </>
  );
}
