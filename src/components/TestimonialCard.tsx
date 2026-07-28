interface TestimonialCardProps {
  name: string;
  location: string;
  text: string;
  isSample?: boolean;
}

export default function TestimonialCard({ name, location, text, isSample }: TestimonialCardProps) {
  return (
    <div className="bg-soft-cream border border-light-border rounded-xl p-6 relative">
      {isSample && (
        <span className="absolute top-3 right-3 bg-subtle-gold text-white text-[10px] font-semibold uppercase px-2 py-0.5 rounded">
          Sample testimonial
        </span>
      )}
      <svg className="w-8 h-8 text-subtle-gold/40 mb-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
      </svg>
      <p className="text-dark-text/80 text-sm italic leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
      <div>
        <p className="text-dark-text font-semibold text-sm">{name}</p>
        <p className="text-dark-text/50 text-xs">{location}</p>
      </div>
    </div>
  );
}
