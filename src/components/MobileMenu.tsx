'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X, MessageCircle } from 'lucide-react';
import { navigation } from '@/data/navigation';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';
import enMessages from '@/messages/en.json';
import arMessages from '@/messages/ar.json';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'en' | 'ar';
  dir?: 'ltr' | 'rtl';
}

export default function MobileMenu({ isOpen, onClose, lang = 'en', dir = 'ltr' }: MobileMenuProps) {
  const t = lang === 'ar' ? arMessages : enMessages;
  const otherLang = lang === 'en' ? 'ar' : 'en';
  const otherHref = lang === 'en' ? '/ar' : '/';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          'fixed top-0 bottom-0 z-50 w-72 bg-[#0B5D3B] shadow-xl transition-transform duration-300 ease-in-out flex flex-col',
          dir === 'rtl' ? 'left-0' : 'right-0',
          isOpen
            ? 'translate-x-0'
            : dir === 'rtl'
              ? '-translate-x-full'
              : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#DFD7C5]/20">
          <span className="text-[#FFFDF7] font-bold">{t.site?.name as string}</span>
          <button onClick={onClose} className="text-[#FFFDF7] p-1 hover:text-[#C5A253] transition-colors" aria-label="Close menu">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="block text-[#F8F3E7] hover:text-[#C5A253] py-3 px-2 rounded-lg text-base font-medium transition-colors hover:bg-[#16794D]/30"
            >
              {lang === 'ar' ? item.labelAr : item.label}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-[#DFD7C5]/20 space-y-4">
          <div>
            <span className="text-[#DFD7C5] text-xs block mb-2">{t.common?.language as string}</span>
            <div className="flex items-center gap-2">
              <Link
                href={otherHref}
                className={cn(
                  'text-sm font-medium transition-colors',
                  lang === 'en' ? 'text-[#C5A253]' : 'text-[#F8F3E7] hover:text-[#C5A253]'
                )}
                onClick={onClose}
              >
                English
              </Link>
              <span className="text-[#DFD7C5]/50">|</span>
              <Link
                href={otherHref}
                className={cn(
                  'text-sm font-medium transition-colors',
                  lang === 'ar' ? 'text-[#C5A253]' : 'text-[#F8F3E7] hover:text-[#C5A253]'
                )}
                onClick={onClose}
              >
                العربية
              </Link>
            </div>
          </div>

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center justify-center gap-2 bg-[#16794D] hover:bg-[#073D2A] text-[#FFFDF7] px-4 py-3 rounded-lg text-sm font-medium transition-colors w-full border border-[#C5A253]/30"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t.common?.talkPrivately as string}</span>
          </a>
        </div>
      </div>
    </>
  );
}
