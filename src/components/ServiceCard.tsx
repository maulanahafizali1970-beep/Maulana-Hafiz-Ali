import Link from 'next/link';
import { Heart, HeartHandshake, Users, Home, HeartOff, Shield, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl, getServiceMessage } from '@/lib/whatsapp';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  heart: Heart,
  'heart-handshake': HeartHandshake,
  users: Users,
  home: Home,
  'heart-off': HeartOff,
  shield: Shield,
};

interface ServiceCardProps {
  title: string;
  description: string;
  slug: string;
  iconName: string;
  excerpt?: string;
  disclaimer?: string;
}

export default function ServiceCard({ title, description, slug, iconName, excerpt, disclaimer }: ServiceCardProps) {
  const Icon = iconMap[iconName] || Heart;
  const whatsappUrl = getWhatsAppUrl(getServiceMessage(title));

  return (
    <div className="border border-subtle-gold/30 rounded-xl bg-warm-ivory shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      <div className="h-40 bg-gradient-to-br from-deep-emerald via-medium-green to-dark-forest flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-dark-text mb-2">{title}</h3>
        {excerpt && <p className="text-dark-text/70 text-sm mb-4">{excerpt}</p>}
        {!excerpt && description && (
          <p className="text-dark-text/70 text-sm mb-4 line-clamp-3">{description}</p>
        )}
        <div className="mt-auto space-y-3">
          <Link
            href={`/services/${slug}`}
            className="inline-flex items-center text-subtle-gold hover:text-deep-emerald font-medium text-sm transition-colors"
          >
            Read More
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-deep-emerald text-white rounded-lg hover:bg-dark-forest transition-colors text-sm font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            Consultation on WhatsApp
          </a>
          {disclaimer && (
            <p className="text-xs text-dark-text/50 italic mt-2">{disclaimer}</p>
          )}
        </div>
      </div>
    </div>
  );
}
