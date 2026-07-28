import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for Maulana Hafiz Ali. Important information about the nature and limitations of our spiritual guidance services.',
};

export default function DisclaimerPage() {
  return (
    <>
      <section className="bg-soft-cream border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Disclaimer' },
            ]}
          />
        </div>
      </section>

      <section className="bg-warm-ivory py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-dark-forest mb-8">Disclaimer</h1>

          <div className="space-y-8 text-dark-text/80 leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">General Information</h2>
              <p>
                The services provided by Maulana Hafiz Ali are for spiritual, educational and
                general guidance purposes only. They are not a substitute for professional advice
                or treatment.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">No Professional Advice</h2>
              <p>
                The guidance provided through consultations, articles and other content on this
                website does not constitute medical, legal, psychological or financial advice.
                If you require professional assistance, you should consult a qualified professional
                in the relevant field.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">No Guaranteed Results</h2>
              <p>
                Maulana Hafiz Ali does not guarantee specific results or outcomes from any
                consultation or guidance. Individual experiences vary, and factors affecting
                outcomes include personal circumstances, willingness to participate and external
                factors beyond anyone's control.
              </p>
              <p className="mt-2">
                No spiritual guidance service can force or control another person's feelings,
                decisions or actions. Every individual has free will.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">Emergency and Safety</h2>
              <p>
                If you are facing threats, violence, coercion or immediate danger, contact local
                emergency services or a trusted local support organisation immediately. Spiritual
                guidance is not a replacement for professional safety assistance.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">Mental Health</h2>
              <p>
                If you are experiencing thoughts of self-harm, severe depression, anxiety or other
                mental health concerns, please contact a qualified mental health professional or
                a crisis helpline in your country.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">Medical Conditions</h2>
              <p>
                Spiritual guidance does not diagnose, treat or cure medical conditions. If you
                have health concerns, please consult a licensed medical practitioner.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">Legal Matters</h2>
              <p>
                For legal matters including divorce, child custody, inheritance or other legal
                proceedings, you should consult a qualified legal professional in your jurisdiction.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">Payment Security</h2>
              <p>
                payments should only be made through official channels provided by Maulana Hafiz Ali.
                We will never request your banking passwords, OTPs, verification codes or other
                sensitive financial credentials. If you encounter any suspicious requests, please
                contact us immediately.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">Testimonials</h2>
              <p>
                Testimonials displayed on this website reflect individual experiences and do not
                guarantee similar results for others. They are not intended to represent or
                guarantee that current or future clients will achieve the same or similar outcomes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">External Links</h2>
              <p>
                This website may contain links to external websites. Maulana Hafiz Ali is not
                responsible for the content or practices of these external sites.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-forest mb-3">Changes to This Disclaimer</h2>
              <p>
                We reserve the right to update this disclaimer at any time. Changes will be posted
                on this page with an updated revision date.
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
