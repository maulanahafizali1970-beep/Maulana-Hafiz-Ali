import Image from 'next/image';
import Link from 'next/link';
import { Heart, HeartHandshake, Users, Home, HeartOff, Shield, BookOpen, Scale, Sparkles, Coins, Briefcase, ShieldAlert } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart: Heart,
  HeartHandshake: HeartHandshake,
  Users: Users,
  Home: Home,
  HeartOff: HeartOff,
  Shield: Shield,
  BookOpen: BookOpen,
  Scale: Scale,
  Sparkles: Sparkles,
  Coins: Coins,
  Briefcase: Briefcase,
  ShieldAlert: ShieldAlert,
};

interface ServiceCardProps {
  title: string;
  description: string;
  slug: string;
  iconName: string;
  image?: string;
  imageAlt?: string;
  excerpt?: string;
  disclaimer?: string;
  featured?: boolean;
}

export default function ServiceCard({ title, description, slug, iconName, image, imageAlt, excerpt, disclaimer, featured }: ServiceCardProps) {
  const Icon = iconMap[iconName] || Heart;

  return (
    <div className={`relative border rounded-xl bg-warm-ivory shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col ${featured ? 'border-subtle-gold border-2 shadow-lg' : 'border-subtle-gold/30'}`}>
      {featured && (
        <div className="absolute top-3 left-3 z-10 bg-subtle-gold text-dark-forest text-xs font-bold px-3 py-1 rounded-full shadow">
          ★ Featured — Wazifa
        </div>
      )}
      <div className="h-40 relative overflow-hidden bg-gradient-to-br from-deep-emerald via-medium-green to-dark-forest">
        {image ? (
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Icon className="w-8 h-8 text-white" />
            </div>
          </div>
        )}
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
          <Link
            href="#contact-form"
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-deep-emerald text-white rounded-lg hover:bg-dark-forest transition-colors text-sm font-medium"
          >
            Get Your Solution
          </Link>
          {disclaimer && (
            <p className="text-xs text-dark-text/50 italic mt-2">{disclaimer}</p>
          )}
        </div>
      </div>
    </div>
  );
}
