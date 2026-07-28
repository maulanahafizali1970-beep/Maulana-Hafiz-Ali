import Link from 'next/link';

interface AboutSectionProps {
  heading: string;
  content: string;
  points: string[];
  lang?: string;
}

export default function AboutSection({ heading, content, points, lang = 'en' }: AboutSectionProps) {
  const isArabic = lang === 'ar';

  return (
    <section className={`grid md:grid-cols-2 gap-10 items-center ${isArabic ? 'text-right' : ''}`}>
      <div className={`space-y-5 ${isArabic ? 'md:order-2' : ''}`}>
        <h2 className="text-3xl font-bold text-dark-text">{heading}</h2>
        <p className="text-dark-text/80 leading-relaxed">{content}</p>
        <ul className={`space-y-2 ${isArabic ? 'list-none' : ''}`}>
          {points.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-dark-text/80">
              {!isArabic && (
                <span className="text-subtle-gold mt-1 shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <Link
          href="/about"
          className="inline-block px-6 py-3 bg-deep-emerald text-white rounded-lg hover:bg-dark-forest transition-colors font-medium text-sm"
        >
          {isArabic ? 'اقرأ المزيد' : 'Learn More'}
        </Link>
      </div>
      <div className={`${isArabic ? 'md:order-1' : ''}`}>
        <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-deep-emerald via-medium-green to-dark-forest flex items-center justify-center p-6 shadow-lg">
          <p className="text-white/80 text-center text-lg font-medium leading-relaxed">
            {isArabic ? 'صورة شخصية للمولانا حافظ علي' : 'Portrait of Maulana Hafiz Ali'}
          </p>
        </div>
      </div>
    </section>
  );
}
