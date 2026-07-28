import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and conditions for using the Maulana Hafiz Ali website and services.',
};

export default function TermsConditionsPage() {
  return (
    <>
      <section className="bg-soft-cream border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Terms and Conditions' },
            ]}
          />
        </div>
      </section>

      <section className="bg-warm-ivory py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-dark-forest mb-8">Terms and Conditions</h1>

          <div className="space-y-8 text-dark-text/80 leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Maulana Hafiz Ali website and services, you agree to be
                bound by these Terms and Conditions. If you do not agree with any part of these
                terms, please do not use our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">2. Service Description</h2>
              <p>
                Maulana Hafiz Ali provides spiritual and relationship guidance services for
                educational and general guidance purposes. Our services include confidential
                consultations, spiritual advice and relationship guidance based on Islamic
                principles.
              </p>
              <p className="mt-2">
                These services are not a replacement for professional medical, legal, psychological
                or financial advice.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">3. No Guarantees</h2>
              <p>
                Maulana Hafiz Ali does not guarantee specific outcomes or results from any
                consultation or guidance service. Results vary according to individual circumstances.
                We do not claim to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Force or control another person's feelings or decisions</li>
                <li>Remove another person's free will</li>
                <li>Guarantee reconciliation or return of an ex-partner</li>
                <li>Guarantee marriage within a specific timeframe</li>
                <li>Provide medical diagnoses or cures</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">4. User Responsibilities</h2>
              <p>As a user of our services, you agree to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Provide accurate and truthful information</li>
                <li>Not use our services for unlawful purposes</li>
                <li>Not make claims based on our services that are false or misleading</li>
                <li>Seek professional help for medical, legal or emergency situations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">5. Payment Terms</h2>
              <p>
                Fees, consultation duration and service details will be explained clearly before
                any payment is requested. payments should only be made through official channels
                provided by Maulana Hafiz Ali. We will never request sensitive banking passwords,
                verification codes or unnecessary private documents.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">6. Limitation of Liability</h2>
              <p>
                Maulana Hafiz Ali shall not be liable for any direct, indirect, incidental or
                consequential damages arising from the use or inability to use our services.
                Clients are responsible for their own decisions and actions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">7. Intellectual Property</h2>
              <p>
                All content on this website, including text, images and branding, is the property
                of Maulana Hafiz Ali and may not be reproduced without permission.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">8. Changes to Terms</h2>
              <p>
                We reserve the right to update these terms at any time. Users will be notified of
                material changes. Continued use of our services constitutes acceptance of updated
                terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">9. Contact</h2>
              <p>
                For questions about these Terms and Conditions, please contact us at:{' '}
                <a href="mailto:contact@maulanahafizali.com" className="text-subtle-gold hover:text-deep-emerald">
                  contact@maulanahafizali.com
                </a>
              </p>
            </div>

            <div className="pt-4 border-t border-light-border">
              <p className="text-sm text-dark-text/50">Last updated: January 2026</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
