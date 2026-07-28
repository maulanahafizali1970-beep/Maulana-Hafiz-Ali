import Link from 'next/link';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import enMessages from '@/messages/en.json';
import arMessages from '@/messages/ar.json';

interface MobileContactBarProps {
  lang?: 'en' | 'ar';
}

const labels = {
  en: { call: 'Call', whatsapp: 'WhatsApp', consultation: 'Consultation' },
  ar: { call: 'اتصال', whatsapp: 'واتساب', consultation: 'استشارة' },
};

export default function MobileContactBar({ lang = 'en' }: MobileContactBarProps) {
  const t = lang === 'ar' ? arMessages : enMessages;
  const site = t.site;
  const l = labels[lang];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0B5D3B] border-t border-[#C5A253]/20 z-40">
      <div className="flex items-center justify-around py-2 px-2">
        <a
          href={`tel:${site.phone}`}
          className="flex flex-col items-center gap-0.5 text-[#FFFDF7] text-[10px] px-3 py-1 hover:text-[#C5A253] transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span>{l.call}</span>
        </a>
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 text-[#FFFDF7] text-[10px] px-3 py-1 hover:text-[#C5A253] transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{l.whatsapp}</span>
        </a>
        <Link
          href="/contact"
          className="flex flex-col items-center gap-0.5 text-[#FFFDF7] text-[10px] px-3 py-1 hover:text-[#C5A253] transition-colors"
        >
          <Calendar className="w-5 h-5" />
          <span>{l.consultation}</span>
        </Link>
      </div>
    </div>
  );
}
