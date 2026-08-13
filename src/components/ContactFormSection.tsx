'use client';

import { usePathname } from 'next/navigation';
import ConsultationForm from './ConsultationForm';

export default function ContactFormSection() {
  const pathname = usePathname();
  const lang = pathname.startsWith('/ar') ? 'ar' : 'en';
  const isArabic = lang === 'ar';

  const skip = ['/contact', '/online-consultation'];
  if (skip.includes(pathname)) return null;

  return (
    <section id="contact-form" className="bg-warm-ivory py-16" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-forest mb-4">
            {isArabic ? 'أرسل تفاصيلك للتواصل معك' : 'Submit Your Contact Details'}
          </h2>
          <p className="text-dark-text/70">
            {isArabic
              ? 'أرسل تفاصيلك وسيتم التواصل معك لحل مشكلتك عبر مكالمة هاتفية. الحل لأي نوع من المشاكل.'
              : 'Submit your details and you will be contacted to resolve your problem over a phone call. Only you will get the solution to your problems over a phone call.'}
          </p>
        </div>
        <div className="max-w-2xl mx-auto bg-soft-cream border border-light-border rounded-xl p-6 md:p-8 shadow-sm">
          <ConsultationForm lang={lang} />
        </div>
      </div>
    </section>
  );
}
