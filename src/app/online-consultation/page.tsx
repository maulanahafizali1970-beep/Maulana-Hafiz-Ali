import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle, Phone, Video } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ConsultationForm from '@/components/ConsultationForm';
import ConsultationSteps from '@/components/ConsultationSteps';
import CTASection from '@/components/CTASection';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Online Consultation',
  description:
    'Book a confidential online consultation with Maulana Hafiz Ali. Islamic spiritual and relationship guidance available worldwide via WhatsApp, phone or online form.',
};

const steps = [
  { title: 'Share Your Situation', description: 'Complete the form or send a private WhatsApp message.' },
  { title: 'Choose Your Language', description: 'Select English or Arabic for your consultation.' },
  { title: 'Receive Personalized Guidance', description: 'Your situation will be reviewed privately before guidance is provided.' },
  { title: 'Take Practical and Spiritual Steps', description: 'Follow respectful recommendations based on your circumstances.' },
];

export default function OnlineConsultationPage() {
  return (
    <>
      <section className="bg-soft-cream border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Online Consultation' },
            ]}
          />
        </div>
      </section>

      <section className="bg-warm-ivory py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-dark-forest mb-4">
              Online Consultation
            </h1>
            <p className="text-dark-text/70 text-lg">
              Receive confidential Islamic spiritual and relationship guidance from anywhere in the world.
              Choose the method that works best for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 bg-soft-cream border border-light-border rounded-lg text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-deep-emerald/10 flex items-center justify-center mb-4">
                <MessageCircle className="w-7 h-7 text-deep-emerald" />
              </div>
              <h3 className="font-bold text-dark-forest text-lg mb-2">WhatsApp Consultation</h3>
              <p className="text-dark-text/70 text-sm mb-4">
                Send a message directly through WhatsApp. Responses provided during consultation hours.
              </p>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-deep-emerald hover:bg-dark-forest text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Message on WhatsApp
              </a>
            </div>

            <div className="p-6 bg-soft-cream border border-light-border rounded-lg text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-deep-emerald/10 flex items-center justify-center mb-4">
                <Phone className="w-7 h-7 text-deep-emerald" />
              </div>
              <h3 className="font-bold text-dark-forest text-lg mb-2">Phone Consultation</h3>
              <p className="text-dark-text/70 text-sm mb-4">
                Request a call back for a private conversation at a scheduled time.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-deep-emerald text-deep-emerald hover:bg-deep-emerald hover:text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                <Phone className="w-4 h-4" />
                Request a Call
              </Link>
            </div>

            <div className="p-6 bg-soft-cream border border-light-border rounded-lg text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-deep-emerald/10 flex items-center justify-center mb-4">
                <Video className="w-7 h-7 text-deep-emerald" />
              </div>
              <h3 className="font-bold text-dark-forest text-lg mb-2">Online Form</h3>
              <p className="text-dark-text/70 text-sm mb-4">
                Fill out the consultation form and you will be contacted during consultation hours.
              </p>
              <a
                href="#form"
                className="inline-flex items-center gap-2 border-2 border-deep-emerald text-deep-emerald hover:bg-deep-emerald hover:text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Fill the Form
              </a>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-dark-forest text-center mb-10">
              How Your Private Consultation Works
            </h2>
            <ConsultationSteps
              steps={steps}
              note="Fees, consultation duration and service details should be explained before payment. Never request sensitive banking passwords, verification codes or unnecessary private documents."
            />
          </div>

          <div id="form" className="max-w-2xl mx-auto">
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
        text="Connect directly through WhatsApp for immediate assistance during consultation hours."
        availability="Arabic and English consultations available."
      />
    </>
  );
}
