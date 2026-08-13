'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail } from 'lucide-react';
import { footerServices, footerLinks } from '@/data/navigation';
import enMessages from '@/messages/en.json';
import arMessages from '@/messages/ar.json';

export default function Footer() {
  const pathname = usePathname();
  const lang = pathname.startsWith('/ar') ? 'ar' : 'en';
  const t = lang === 'ar' ? arMessages : enMessages;
  const site = t.site;
  const footer = t.footer;

  return (
    <footer className="bg-[#073D2A] text-[#F8F3E7]" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <h3 className="text-[#C5A253] font-bold text-lg mb-4">{site.name as string}</h3>
            <p className="text-sm text-[#DFD7C5] leading-relaxed">{footer.about as string}</p>
          </div>

          <div>
            <h3 className="text-[#C5A253] font-bold text-lg mb-4">{footer.services as string}</h3>
            <ul className="space-y-2">
              {footerServices.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#DFD7C5] hover:text-[#C5A253] transition-colors"
                  >
                    {lang === 'ar' ? item.labelAr : item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#C5A253] font-bold text-lg mb-4">{footer.links as string}</h3>
            <ul className="space-y-2">
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#DFD7C5] hover:text-[#C5A253] transition-colors"
                  >
                    {lang === 'ar' ? item.labelAr : item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#C5A253] font-bold text-lg mb-4">{footer.contact as string}</h3>
            <div className="space-y-3 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 text-[#DFD7C5] hover:text-[#C5A253] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#C5A253]" />
                {site.email as string}
              </a>
            </div>

            <div className="mt-6">
              <Link
                href="#contact-form"
                className="inline-flex items-center justify-center gap-2 bg-[#16794D] hover:bg-[#0B5D3B] text-[#FFFDF7] px-5 py-2.5 rounded-lg text-sm font-medium transition-colors border border-[#C5A253]/30"
              >
                {t.common?.submitDetails as string}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#C5A253]/30" />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <p className="text-xs text-[#DFD7C5] leading-relaxed text-center">
          {footer.disclaimer as string}
        </p>
      </div>

      <div className="border-t border-[#C5A253]/30" />

      <div className="max-w-7xl mx-auto px-4 py-4">
        <p className="text-xs text-[#DFD7C5] text-center">
          {site.copyright as string}
        </p>
      </div>
    </footer>
  );
}
