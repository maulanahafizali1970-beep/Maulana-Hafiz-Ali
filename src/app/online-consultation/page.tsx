import type { Metadata } from 'next';
import Link from 'next/link';
import { PhoneCall, Video } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ConsultationForm from '@/components/ConsultationForm';
import ConsultationSteps from '@/components/ConsultationSteps';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Online Consultation',
  description:
    'Submit your details for a confidential online consultation with Maulana Hafiz Ali. Spiritual guidance available worldwide to resolve any kind of problem.',
};

const steps = [
  { title: 'Submit Your Details', description: 'Fill out the contact details form on this page.' },
  { title: 'Choose Your Language', description: 'Select English or Arabic for your consultation.' },
  { title: 'Receive a Call', description: 'You will be contacted over a phone call to understand your problem.' },
  { title: 'Get Your Solution', description: 'A problem of any kind is rooted out in just three hours.' },
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
              Only you will get the solution to your problems over a phone call. Get work done
              from any corner of the world — a problem of any kind is rooted out in just three hours.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 bg-soft-cream border border-light-border rounded-lg text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-deep-emerald/10 flex items-center justify-center mb-4">
                <PhoneCall className="w-7 h-7 text-deep-emerald" />
              </div>
              <h3 className="font-bold text-dark-forest text-lg mb-2">Phone Consultation</h3>
              <p className="text-dark-text/70 text-sm mb-4">
                You will be contacted over a phone call to understand your problem and guide you
                to the right solution.
              </p>
              <Link
                href="#contact-form"
                className="inline-flex items-center gap-2 border-2 border-deep-emerald text-deep-emerald hover:bg-deep-emerald hover:text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Submit Your Details
              </Link>
            </div>

            <div className="p-6 bg-soft-cream border border-light-border rounded-lg text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-deep-emerald/10 flex items-center justify-center mb-4">
                <Video className="w-7 h-7 text-deep-emerald" />
              </div>
              <h3 className="font-bold text-dark-forest text-lg mb-2">Any Problem, Anywhere</h3>
              <p className="text-dark-text/70 text-sm mb-4">
                Court cases, business obstacles, jobs and children problems, family disputes and
                every kind of personal difficulty.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 border-2 border-deep-emerald text-deep-emerald hover:bg-deep-emerald hover:text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                View All Services
              </Link>
            </div>

            <div className="p-6 bg-soft-cream border border-light-border rounded-lg text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-deep-emerald/10 flex items-center justify-center mb-4">
                <PhoneCall className="w-7 h-7 text-deep-emerald" />
              </div>
              <h3 className="font-bold text-dark-forest text-lg mb-2">Solution in Three Hours</h3>
              <p className="text-dark-text/70 text-sm mb-4">
                A problem of any kind is rooted out in just three hours. Disappointed from Tantriks?
                Try once for sure.
              </p>
              <a
                href="#contact-form"
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

          <div id="contact-form" className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-dark-forest text-center mb-8">
              Send Your Contact Details
            </h2>
            <div className="bg-soft-cream border border-light-border rounded-xl p-6 md:p-8 shadow-sm">
              <ConsultationForm />
            </div>
          </div>        </div>
      </section>

      <CTASection
        heading="Ready to Get Your Solution?"
        text="Only you will get the solution to your problems over a phone call. Submit your details and be contacted from any corner of the world."
        availability="Arabic and English consultations available."
      />
    </>
  );
}
