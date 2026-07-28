import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex items-center flex-wrap gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 && (
                <span className="text-subtle-gold mx-1" aria-hidden="true">/</span>
              )}
              {item.href && !isLast ? (
                <Link href={item.href} className="text-dark-text/60 hover:text-deep-emerald transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-dark-text font-medium' : 'text-dark-text/60'}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
