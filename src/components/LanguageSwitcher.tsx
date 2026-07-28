import Link from 'next/link';

interface LanguageSwitcherProps {
  lang?: 'en' | 'ar';
}

export default function LanguageSwitcher({ lang = 'en' }: LanguageSwitcherProps) {
  const currentLabel = lang === 'en' ? 'English' : 'العربية';
  const otherLang = lang === 'en' ? 'ar' : 'en';
  const otherLabel = lang === 'en' ? 'العربية' : 'English';
  const otherHref = lang === 'en' ? '/ar' : '/';

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-[#C5A253] font-medium">{currentLabel}</span>
      <span className="text-[#DFD7C5]/50">|</span>
      <Link
        href={otherHref}
        className="text-[#F8F3E7] hover:text-[#C5A253] transition-colors"
      >
        {otherLabel}
      </Link>
    </div>
  );
}
