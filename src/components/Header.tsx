'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown } from 'lucide-react';
import { NavigationItem } from '@/types';
import { navigation } from '@/data/navigation';
import enMessages from '@/messages/en.json';
import arMessages from '@/messages/ar.json';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

function NavItem({ item, lang, dir }: { item: NavigationItem; lang: 'en' | 'ar'; dir: 'ltr' | 'rtl' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!item.children) {
    return (
      <li>
        <Link
          href={item.href}
          className="text-[#F8F3E7] hover:text-[#C5A253] text-sm font-medium transition-colors"
        >
          {lang === 'ar' ? item.labelAr : item.label}
        </Link>
      </li>
    );
  }

  return (
    <li ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-[#F8F3E7] hover:text-[#C5A253] text-sm font-medium transition-colors"
      >
        {lang === 'ar' ? item.labelAr : item.label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div
          className={`absolute top-full pt-2 ${dir === 'rtl' ? 'left-0' : 'right-0'}`}
        >
          <div className="bg-[#0B5D3B] border border-[#C5A253]/20 rounded-lg shadow-xl py-2 min-w-56">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="block px-4 py-2 text-sm text-[#F8F3E7] hover:text-[#C5A253] hover:bg-[#16794D]/30 transition-colors whitespace-nowrap"
                onClick={() => setOpen(false)}
              >
                {lang === 'ar' ? child.labelAr : child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </li>
  );
}

export default function Header() {
  const pathname = usePathname();
  const lang = pathname.startsWith('/ar') ? 'ar' : 'en';
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = lang === 'ar' ? arMessages : enMessages;
  const site = t.site;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-[#0B5D3B] px-4 py-3 md:py-4" dir={dir}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="shrink-0">
            <Image src="/images/logo.svg" alt="Maulana Hafiz Ali" width={360} height={108} className="w-64 h-auto md:w-72" />
          </Link>

          <ul className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <NavItem key={item.href} item={item} lang={lang} dir={dir} />
            ))}
          </ul>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden lg:block">
              <LanguageSwitcher lang={lang} />
            </div>

            <Link
              href="#contact-form"
              className="hidden lg:flex items-center gap-2 bg-[#16794D] hover:bg-[#073D2A] text-[#FFFDF7] px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-[#C5A253]/30"
            >
              {t.common?.submitDetails as string}
            </Link>

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
