import { Phone, MessageCircle, Mail } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import enMessages from '@/messages/en.json';
import arMessages from '@/messages/ar.json';

interface AnnouncementBarProps {
  lang?: 'en' | 'ar';
}

export default function AnnouncementBar({ lang = 'en' }: AnnouncementBarProps) {
  const t = lang === 'ar' ? arMessages : enMessages;
  const site = t.site;

  return (
    <div className="hidden md:flex bg-[#073D2A] text-[#F8F3E7] text-xs py-1.5 px-4 items-center justify-between">
      <span>{site.announcement}</span>
      <div className="flex items-center gap-4" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <a href={`tel:${site.phone}`} className="flex items-center gap-1 hover:text-[#C5A253] transition-colors">
          <Phone className="w-3 h-3" />
          {site.phone}
        </a>
        <a
          href={getWhatsAppUrl()}
          className="flex items-center gap-1 hover:text-[#C5A253] transition-colors"
        >
          <MessageCircle className="w-3 h-3" />
          {site.whatsapp}
        </a>
        <a
          href={`mailto:${site.email}`}
          className="flex items-center gap-1 hover:text-[#C5A253] transition-colors"
        >
          <Mail className="w-3 h-3" />
          {site.email}
        </a>
        <span className="text-[#DFD7C5]">{site.hours}</span>
      </div>
    </div>
  );
}
