'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, MessageCircle } from 'lucide-react';
import { navigation } from '@/data/navigation';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import enMessages from '@/messages/en.json';
import arMessages from '@/messages/ar.json';
import AnnouncementBar from './AnnouncementBar';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  lang?: 'en' | 'ar';
  dir?: 'ltr' | 'rtl';
}

export default function Header({ lang = 'en', dir = 'ltr' }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = lang === 'ar' ? arMessages : enMessages;
  const site = t.site;

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar lang={lang} />
      <nav className="bg-[#0B5D3B] px-4 py-3 md:py-4" dir={dir}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-[#FFFDF7]">
            <span className="text-lg md:text-xl font-bold tracking-tight">{site.name as string}</span>
            <span className="block text-xs md:text-sm text-[#DFD7C5] font-normal">{site.tagline as string}</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#F8F3E7] hover:text-[#C5A253] text-sm font-medium transition-colors"
              >
                {lang === 'ar' ? item.labelAr : item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <LanguageSwitcher lang={lang} />
            </div>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 bg-[#16794D] hover:bg-[#073D2A] text-[#FFFDF7] px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-[#C5A253]/30"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.common?.consultWhatsApp as string}</span>
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-[#FFFDF7] p-2 hover:text-[#C5A253] transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        lang={lang}
        dir={dir}
      />
    </header>
  );
}
