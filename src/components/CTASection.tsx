import { MessageCircle, Phone, Mail } from 'lucide-react';

interface CTASectionProps {
  heading: string;
  text: string;
  availability: string;
}

export default function CTASection({ heading, text, availability }: CTASectionProps) {
  return (
    <section className="relative bg-deep-emerald overflow-hidden rounded-2xl px-6 py-12 md:px-12 md:py-16">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(255,255,255,0.06) 15px, rgba(255,255,255,0.06) 30px)`,
        }}
      />
      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">{heading}</h2>
        <p className="text-white/80 leading-relaxed">{text}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href="https://wa.me/971XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-deep-emerald rounded-lg hover:bg-soft-cream transition-colors font-medium text-sm"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Now
          </a>
          <a
            href="tel:+971XXXXXXXXX"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/40 text-white rounded-lg hover:bg-white/10 transition-colors font-medium text-sm"
          >
            <Phone className="w-5 h-5" />
            Request a Call
          </a>
          <a
            href="mailto:contact@maulanahafizali.com"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/40 text-white rounded-lg hover:bg-white/10 transition-colors font-medium text-sm"
          >
            <Mail className="w-5 h-5" />
            Send a Message
          </a>
        </div>
        <p className="text-white/60 text-sm">{availability}</p>
      </div>
    </section>
  );
}
