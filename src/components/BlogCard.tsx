import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image?: string;
  date: string;
  readTime: string;
}

export default function BlogCard({ title, slug, excerpt, category, date, readTime }: BlogCardProps) {
  return (
    <article className="border border-light-border rounded-xl bg-warm-ivory shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      <div className="h-44 bg-gradient-to-br from-deep-emerald via-medium-green to-dark-forest relative">
        <span className="absolute top-3 left-3 bg-subtle-gold text-white text-xs font-semibold px-3 py-1 rounded-full">
          {category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-xs text-dark-text/50 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {readTime}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-dark-text mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-dark-text/70 mb-4 line-clamp-3">{excerpt}</p>
        <div className="mt-auto">
          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center text-subtle-gold hover:text-deep-emerald font-medium text-sm transition-colors"
          >
            Read More
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
