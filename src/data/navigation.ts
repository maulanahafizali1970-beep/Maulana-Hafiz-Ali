import { NavigationItem } from '@/types';

export const navigation: NavigationItem[] = [
  { label: 'Home', labelAr: 'الرئيسية', href: '/' },
  { label: 'About', labelAr: 'عن الشيخ', href: '/about' },
  {
    label: 'Services',
    labelAr: 'الخدمات',
    href: '/services',
    children: [
      { label: 'Wazifa', labelAr: 'وظيفة', href: '/wazifa' },
      { label: 'Vashikaran', labelAr: 'فاشيكران', href: '/vashikaran' },
      { label: 'Court Case Solutions', labelAr: 'حلول القضايا القانونية', href: '/court-case-solutions' },
      { label: 'Business Obstacles', labelAr: 'عوائق الأعمال', href: '/business-obstacles' },
      { label: 'Jobs and Children Problems', labelAr: 'مشاكل العمل والأبناء', href: '/jobs-child-problems' },
      { label: 'Family Dispute Resolution', labelAr: 'حل النزاعات العائلية', href: '/family-dispute-resolution' },
    ],
  },
  { label: 'Testimonials', labelAr: 'تجارب العملاء', href: '/testimonials' },
  { label: 'Blog', labelAr: 'المقالات', href: '/blog' },
  { label: 'Contact', labelAr: 'اتصل بنا', href: '/contact' },
];

export const footerServices: NavigationItem[] = [
  { label: 'Wazifa', labelAr: 'وظيفة', href: '/wazifa' },
  { label: 'Vashikaran', labelAr: 'فاشيكران', href: '/vashikaran' },
  { label: 'Court Case Solutions', labelAr: 'حلول القضايا القانونية', href: '/court-case-solutions' },
  { label: 'Buried Wealth', labelAr: 'الكنوز المدفونة', href: '/buried-wealth' },
  { label: 'Business Obstacles', labelAr: 'عوائق الأعمال', href: '/business-obstacles' },
  { label: 'Jobs and Children Problems', labelAr: 'مشاكل العمل والأبناء', href: '/jobs-child-problems' },
  { label: 'Freedom from Enemies', labelAr: 'التخلص من الأعداء', href: '/freedom-from-enemies' },
  { label: 'Family Dispute Resolution', labelAr: 'حل النزاعات العائلية', href: '/family-dispute-resolution' },
];

export const footerLinks: NavigationItem[] = [
  { label: 'About', labelAr: 'عن الشيخ', href: '/about' },
  { label: 'Blog', labelAr: 'المقالات', href: '/blog' },
  { label: 'Testimonials', labelAr: 'تجارب العملاء', href: '/testimonials' },
  { label: 'FAQs', labelAr: 'الأسئلة الشائعة', href: '/faq' },
  { label: 'Contact', labelAr: 'اتصل بنا', href: '/contact' },
  { label: 'Privacy Policy', labelAr: 'سياسة الخصوصية', href: '/privacy-policy' },
  { label: 'Terms and Conditions', labelAr: 'الشروط والأحكام', href: '/terms-conditions' },
  { label: 'Disclaimer', labelAr: 'إخلاء مسؤولية', href: '/disclaimer' },
];
