import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Maulana Hafiz Ali. Learn how your personal information is collected, used and protected.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-soft-cream border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Privacy Policy' },
            ]}
          />
        </div>
      </section>

      <section className="bg-warm-ivory py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-dark-forest mb-8">Privacy Policy</h1>

          <div className="space-y-8 text-dark-text/80 leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">1. Introduction</h2>
              <p>
                Maulana Hafiz Ali respects your privacy and is committed to protecting your personal
                information. This Privacy Policy explains how we collect, use, store and protect your
                data when you use our website or services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">2. Information We Collect</h2>
              <p>We may collect the following information when you submit a consultation request:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Full name</li>
                <li>Email address</li>
                <li>Country of residence</li>
                <li>Phone number</li>
                <li>Preferred language</li>
                <li>Service required</li>
                <li>Message or description of your situation</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">3. How We Use Your Information</h2>
              <p>Your information is used solely for the following purposes:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>To respond to your consultation request</li>
                <li>To provide the guidance or service you have requested</li>
                <li>To communicate with you regarding your enquiry</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">4. Data Protection</h2>
              <p>
                We implement appropriate technical and organisational measures to protect your
                personal information against unauthorised access, alteration, disclosure or destruction.
                Your data is stored securely and only accessible to authorised personnel.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">5. Data Sharing</h2>
              <p>
                We do not sell, trade or share your personal information with third parties without
                your explicit consent, except where required by law.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">6. Data Retention</h2>
              <p>
                We retain your personal information only for as long as necessary to fulfil the
                purposes described in this policy, or as required by applicable law.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Request access to your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">8. Cookies</h2>
              <p>
                This website may use essential cookies for functionality. No tracking or advertising
                cookies are used without consent.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">9. Contact</h2>
              <p>
                For questions about this Privacy Policy, please contact us at:{' '}
                <a href="mailto:xxx" className="text-subtle-gold hover:text-deep-emerald">
                  xxx
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
