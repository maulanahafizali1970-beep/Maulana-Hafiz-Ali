import type { Metadata } from 'next';
import { Clock } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ConsultationForm from '@/components/ConsultationForm';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Submit your contact details to Maulana Hafiz Ali for confidential spiritual guidance. You will be contacted to resolve your problem over a phone call.',
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-soft-cream border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Contact' },
            ]}
          />
        </div>
      </section>

      <section className="bg-warm-ivory py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-dark-forest mb-4">
              Contact Us
            </h1>
            <p className="text-dark-text/70 text-lg">
              Submit your contact details and you will be contacted to resolve your problem
              over a phone call. Only you will get the solution to your problems over a phone call.
            </p>
          </div>

          <div className="p-6 bg-deep-emerald/5 border border-deep-emerald/20 rounded-xl mb-12 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-deep-emerald flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-dark-forest mb-1">Consultation Hours</h3>
                <p className="text-dark-text/70 text-sm">
                  Saturday – Thursday, 10:00 AM – 8:00 PM (GST)
                </p>
                <p className="text-dark-text/50 text-xs mt-1">
                  Friday and public holidays: limited availability
                </p>
              </div>
            </div>
          </div>

          <div id="contact-form" className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-dark-forest text-center mb-8">
              Send Your Contact Details
            </h2>
            <div className="bg-soft-cream border border-light-border rounded-xl p-6 md:p-8 shadow-sm">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>

      <CTASection
        heading="Ready to Get Your Solution?"
        text="Only you will get the solution to your problems over a phone call. Submit your details and be contacted from any corner of the world."
        availability="Arabic and English consultations available."
      />
    </>
  );
}
