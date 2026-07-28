import { MessageCircle, Phone } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';

interface WhatsAppButtonProps {
  message?: string;
}

export default function WhatsAppButton({ message }: WhatsAppButtonProps) {
  const whatsappUrl = getWhatsAppUrl(message);

  return (
    <div className="hidden md:flex fixed bottom-6 right-6 flex-col items-center gap-2 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-deep-emerald hover:bg-dark-forest shadow-lg flex items-center justify-center transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
      <a
        href="tel:+971XXXXXXXXX"
        className="w-10 h-10 rounded-full bg-subtle-gold hover:bg-subtle-gold/80 shadow-md flex items-center justify-center transition-colors"
        aria-label="Call for consultation"
      >
        <Phone className="w-5 h-5 text-white" />
      </a>
    </div>
  );
}
