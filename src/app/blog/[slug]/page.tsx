import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MessageCircle, ArrowLeft, User, Calendar } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTASection from '@/components/CTASection';
import BlogCard from '@/components/BlogCard';
import { blogPosts } from '@/data/blog';
import { getWhatsAppUrl } from '@/lib/whatsapp';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const contentLines = post.content.split('\n').filter(Boolean);
  const tocItems = contentLines
    .filter((line) => line.startsWith('**'))
    .map((line) => line.replace(/\*\*/g, '').trim());

  return (
    <>
      <section className="bg-soft-cream border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: post.title },
            ]}
          />
        </div>
      </section>

      <article className="bg-warm-ivory py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-subtle-gold hover:text-deep-emerald text-sm font-medium transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>

          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-subtle-gold/20 text-subtle-gold text-xs font-semibold rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-dark-forest mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-dark-text/60">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                Maulana Hafiz Ali
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="relative w-full aspect-[2/1] rounded-xl overflow-hidden border border-light-border shadow-lg bg-gradient-to-br from-deep-emerald via-medium-green to-dark-forest mb-10">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            </div>
          </div>

          {tocItems.length > 0 && (
            <div className="bg-soft-cream border border-light-border rounded-xl p-6 mb-10">
              <h2 className="text-lg font-bold text-dark-forest mb-3">Table of Contents</h2>
              <ul className="space-y-2">
                {tocItems.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={`#section-${idx}`}
                      className="text-subtle-gold hover:text-deep-emerald text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            {contentLines.map((line, idx) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                const heading = line.replace(/\*\*/g, '');
                return (
                  <h2
                    key={idx}
                    id={`section-${tocItems.indexOf(heading)}`}
                    className="text-xl font-bold text-dark-forest mt-8 mb-4"
                  >
                    {heading}
                  </h2>
                );
              }
              if (line.trim() === '') return null;
              return (
                <p key={idx} className="text-dark-text/80 mb-4 leading-relaxed">
                  {line}
                </p>
              );
            })}
          </div>

          <div className="border-t border-light-border mt-12 pt-8">
            <div className="flex items-start gap-4 p-6 bg-soft-cream rounded-xl">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-deep-emerald to-dark-forest flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-dark-forest">Maulana Hafiz Ali</h3>
                <p className="text-sm text-dark-text/70 mt-1">
                  Islamic Spiritual Guide providing confidential relationship and spiritual guidance
                  to individuals and families worldwide.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-light-border mt-8 pt-8">
            <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
              <p className="text-amber-800 text-sm">
                <strong>Disclaimer:</strong> This article is for informational and educational
                purposes only. It does not constitute professional advice. Results vary according
                to individual circumstances. For personalised guidance, please consult directly.
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-deep-emerald hover:bg-dark-forest text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Discuss Your Situation on WhatsApp
            </a>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="bg-soft-cream py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-dark-forest text-center mb-8">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <BlogCard
                  key={rp.id}
                  title={rp.title}
                  slug={rp.slug}
                  excerpt={rp.excerpt}
                  category={rp.category}
                  image={rp.image}
                  date={rp.date}
                  readTime={rp.readTime}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        heading="Need Personal Guidance?"
        text="Every situation is unique. Reach out for a confidential consultation tailored to your specific circumstances."
        availability="Arabic and English consultations available."
      />
    </>
  );
}
