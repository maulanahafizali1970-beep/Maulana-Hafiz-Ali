import type { ReactNode } from 'react';

interface TrustCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function TrustCard({ icon, title, description }: TrustCardProps) {
  return (
    <div className="bg-[#F0F7F0] border-l-4 border-subtle-gold rounded-lg p-5 flex flex-col gap-3 h-full">
      <div className="w-10 h-10 flex items-center justify-center text-deep-emerald">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-dark-text">{title}</h3>
      <p className="text-sm text-dark-text/70 leading-relaxed">{description}</p>
    </div>
  );
}
