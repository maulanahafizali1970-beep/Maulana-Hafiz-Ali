'use client';

import { useState, type FormEvent } from 'react';

const SERVICE_OPTIONS = [
  'Love & Relationship Guidance',
  'Marriage Counseling',
  'Family Dispute Resolution',
  'Spiritual Healing (Rohani Ilaj)',
  'Divorce & Separation Support',
  'Personal Spiritual Guidance',
  'Islamic Education & Knowledge',
  'Other',
] as const;

const LANGUAGE_OPTIONS = ['English', 'Arabic'] as const;

interface FormData {
  fullName: string;
  email: string;
  country: string;
  whatsapp: string;
  language: string;
  service: string;
  message: string;
  consent: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  country?: string;
  whatsapp?: string;
  language?: string;
  service?: string;
  message?: string;
  consent?: string;
}

interface ConsultationFormProps {
  lang?: 'en' | 'ar';
}

type Labels = Record<string, string>;

const EN: Labels = {
  fullName: 'Full Name',
  email: 'Email Address',
  country: 'Country',
  whatsapp: 'WhatsApp Number',
  language: 'Preferred Language',
  service: 'Service Required',
  message: 'Your Message',
  consent: 'I consent to being contacted regarding my consultation request.',
  submit: 'Submit Request',
  submitting: 'Submitting...',
  success: 'Thank you. Your consultation request has been received. Please connect through WhatsApp for a faster response.',
  error: 'Something went wrong. Please try again.',
  privacy: 'Your information is kept confidential and will only be used to respond to your consultation request.',
  required: 'This field is required',
  emailInvalid: 'Please enter a valid email address',
  placeholder: 'Describe your concern briefly...',
  selectService: 'Select a service',
  selectLanguage: 'Select language',
  countryPlaceholder: 'e.g. UAE, India, UK',
};

const AR: Labels = {
  fullName: 'الاسم الكامل',
  email: 'البريد الإلكتروني',
  country: 'الدولة',
  whatsapp: 'رقم الواتساب',
  language: 'اللغة المفضلة',
  service: 'الخدمة المطلوبة',
  message: 'رسالتك',
  consent: 'أوافق على التواصل معي بخصوص طلب الاستشارة الخاص بي.',
  submit: 'إرسال الطلب',
  submitting: 'جارٍ الإرسال...',
  success: 'شكراً لك. تم استلام طلب الاستشارة الخاص بك. يرجى التواصل عبر الواتساب للحصول على رد أسرع.',
  error: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
  privacy: 'معلوماتك سرية ولن تُستخدم إلا للرد على طلب الاستشارة الخاص بك.',
  required: 'هذا الحقل مطلوب',
  emailInvalid: 'يرجى إدخال عنوان بريد إلكتروني صحيح',
  placeholder: 'صف مشكلتك باختصار...',
  selectService: 'اختر خدمة',
  selectLanguage: 'اختر اللغة',
  countryPlaceholder: 'مثال: الإمارات، الهند، المملكة المتحدة',
};

function validate(data: FormData, labels: Labels): FormErrors {
  const errors: FormErrors = {};
  if (!data.fullName.trim()) errors.fullName = labels.required;
  if (!data.email.trim()) {
    errors.email = labels.required;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = labels.emailInvalid;
  }
  if (!data.country.trim()) errors.country = labels.required;
  if (!data.whatsapp.trim()) errors.whatsapp = labels.required;
  if (!data.language) errors.language = labels.required;
  if (!data.service) errors.service = labels.required;
  if (!data.message.trim()) errors.message = labels.required;
  if (!data.consent) errors.consent = labels.required;
  return errors;
}

export default function ConsultationForm({ lang = 'en' }: ConsultationFormProps) {
  const labels = lang === 'ar' ? AR : EN;
  const isArabic = lang === 'ar';

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    country: '',
    whatsapp: '',
    language: '',
    service: '',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  function handleChange(field: keyof FormData, value: string | boolean) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof FormErrors];
        return next;
      });
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate(formData, labels);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  }

  function inputClass(field: keyof FormErrors) {
    return `w-full px-4 py-2.5 border rounded-lg text-sm bg-white text-dark-text outline-none transition-colors ${
      errors[field]
        ? 'border-red-400 focus:border-red-500'
        : 'border-light-border focus:border-subtle-gold'
    }`;
  }

  if (status === 'success') {
    return (
      <div className="bg-[#F0F7F0] border border-medium-green/30 rounded-xl p-8 text-center space-y-3">
        <div className="w-14 h-14 mx-auto rounded-full bg-medium-green/20 flex items-center justify-center">
          <svg className="w-7 h-7 text-medium-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-dark-text font-medium">{labels.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 ${isArabic ? 'text-right' : ''}`}>
        <div className="space-y-1.5">
          <label htmlFor="fullName" className="text-sm font-medium text-dark-text">
            {labels.fullName} <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className={inputClass('fullName')}
            dir={isArabic ? 'rtl' : 'ltr'}
            aria-required="true"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
          {errors.fullName && (
            <p id="fullName-error" role="alert" className="text-xs text-red-500">{errors.fullName}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-dark-text">
            {labels.email} <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={inputClass('email')}
            dir={isArabic ? 'rtl' : 'ltr'}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="country" className="text-sm font-medium text-dark-text">
            {labels.country} <span className="text-red-500">*</span>
          </label>
          <input
            id="country"
            type="text"
            value={formData.country}
            onChange={(e) => handleChange('country', e.target.value)}
            placeholder={labels.countryPlaceholder}
            className={inputClass('country')}
            dir={isArabic ? 'rtl' : 'ltr'}
            aria-required="true"
            aria-invalid={!!errors.country}
            aria-describedby={errors.country ? 'country-error' : undefined}
          />
          {errors.country && (
            <p id="country-error" role="alert" className="text-xs text-red-500">{errors.country}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="whatsapp" className="text-sm font-medium text-dark-text">
            {labels.whatsapp} <span className="text-red-500">*</span>
          </label>
          <input
            id="whatsapp"
            type="tel"
            value={formData.whatsapp}
            onChange={(e) => handleChange('whatsapp', e.target.value)}
            placeholder="e.g. +971 50 123 4567"
            className={inputClass('whatsapp')}
            dir={isArabic ? 'rtl' : 'ltr'}
            aria-required="true"
            aria-invalid={!!errors.whatsapp}
            aria-describedby={errors.whatsapp ? 'whatsapp-error' : undefined}
          />
          {errors.whatsapp && (
            <p id="whatsapp-error" role="alert" className="text-xs text-red-500">{errors.whatsapp}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="language" className="text-sm font-medium text-dark-text">
            {labels.language} <span className="text-red-500">*</span>
          </label>
          <select
            id="language"
            value={formData.language}
            onChange={(e) => handleChange('language', e.target.value)}
            className={inputClass('language')}
            aria-required="true"
            aria-invalid={!!errors.language}
            aria-describedby={errors.language ? 'language-error' : undefined}
          >
            <option value="">{labels.selectLanguage}</option>
            {LANGUAGE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.language && (
            <p id="language-error" role="alert" className="text-xs text-red-500">{errors.language}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="service" className="text-sm font-medium text-dark-text">
            {labels.service} <span className="text-red-500">*</span>
          </label>
          <select
            id="service"
            value={formData.service}
            onChange={(e) => handleChange('service', e.target.value)}
            className={inputClass('service')}
            aria-required="true"
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? 'service-error' : undefined}
          >
            <option value="">{labels.selectService}</option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.service && (
            <p id="service-error" role="alert" className="text-xs text-red-500">{errors.service}</p>
          )}
        </div>
      </div>

      <div className={`space-y-1.5 ${isArabic ? 'text-right' : ''}`}>
        <label htmlFor="message" className="text-sm font-medium text-dark-text">
          {labels.message} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder={labels.placeholder}
          className={inputClass('message')}
          dir={isArabic ? 'rtl' : 'ltr'}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="text-xs text-red-500">{errors.message}</p>
        )}
      </div>

      <div className={`space-y-1.5 ${isArabic ? 'text-right' : ''}`}>
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.consent}
            onChange={(e) => handleChange('consent', e.target.checked)}
            className="mt-1 accent-deep-emerald"
            aria-required="true"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
          />
          <span className="text-sm text-dark-text/80">{labels.consent}</span>
        </label>
        {errors.consent && (
          <p id="consent-error" role="alert" className="text-xs text-red-500">{errors.consent}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-6 py-3 bg-deep-emerald text-white rounded-lg hover:bg-dark-forest transition-colors font-medium text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {labels.submitting}
          </>
        ) : (
          labels.submit
        )}
      </button>

      {status === 'error' && (
        <p role="alert" className="text-sm text-red-500 text-center">{labels.error}</p>
      )}

      <p className={`text-xs text-dark-text/50 italic ${isArabic ? 'text-right' : ''}`}>
        {labels.privacy}
      </p>
    </form>
  );
}
