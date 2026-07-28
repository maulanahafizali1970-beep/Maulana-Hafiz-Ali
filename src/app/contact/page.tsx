import type { Metadata } from 'next';
import { MessageCircle, Phone, Mail, Clock } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ConsultationForm from '@/components/ConsultationForm';
import CTASection from '@/components/CTASection';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Maulana Hafiz Ali for confidential Islamic spiritual and relationship guidance. Reach out via WhatsApp, phone, email or the consultation form.',
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
              Reach out for a confidential consultation. All enquiries are treated with privacy
              and respect.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-soft-cream border border-light-border rounded-lg text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-deep-emerald/10 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-deep-emerald" />
              </div>
              <h3 className="font-bold text-dark-forest mb-2">WhatsApp</h3>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-subtle-gold hover:text-deep-emerald text-sm transition-colors"
              >
                +971 XX XXX XXXX
              </a>
              <p className="text-dark-text/50 text-xs mt-2">Available during consultation hours</p>
            </div>

            <div className="p-6 bg-soft-cream border border-light-border rounded-lg text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-deep-emerald/10 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-deep-emerald" />
              </div>
              <h3 className="font-bold text-dark-forest mb-2">Phone</h3>
              <a
                href="tel:+971XXXXXXXXX"
                className="text-subtle-gold hover:text-deep-emerald text-sm transition-colors"
              >
                +971 XX XXX XXXX
              </a>
              <p className="text-dark-text/50 text-xs mt-2">Available during consultation hours</p>
            </div>

            <div className="p-6 bg-soft-cream border border-light-border rounded-lg text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-deep-emerald/10 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-deep-emerald" />
              </div>
              <h3 className="font-bold text-dark-forest mb-2">Email</h3>
              <a
                href="mailto:contact@maulanahafizali.com"
                className="text-subtle-gold hover:text-deep-emerald text-sm transition-colors"
              >
                contact@maulanahafizali.com
              </a>
              <p className="text-dark-text/50 text-xs mt-2">Responses within 24–48 hours</p>
            </div>
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

          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-dark-forest text-center mb-8">
              Send a Consultation Request
            </h2>
            <div className="bg-soft-cream border border-light-border rounded-xl p-6 md:p-8 shadow-sm">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>

      <CTASection
        heading="Prefer to Talk Now?"
        text="Connect directly through WhatsApp for a faster response to your enquiry."
        availability="Arabic and English consultations available."
      />
    </>
  );
}
