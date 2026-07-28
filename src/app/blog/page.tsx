import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import BlogCard from '@/components/BlogCard';
import CTASection from '@/components/CTASection';
import { blogPosts } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Read articles and guidance on relationships, marriage, family, emotional healing and spiritual wellbeing from Maulana Hafiz Ali.',
};

export default function BlogPage() {
  return (
    <>
      <section className="bg-soft-cream border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog' },
            ]}
          />
        </div>
      </section>

      <section className="bg-warm-ivory py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-dark-forest mb-4">
              Latest Guidance and Articles
            </h1>
            <p className="text-dark-text/70 text-lg">
              Explore articles on relationship guidance, marriage advice, emotional healing
              and spiritual wellbeing from an Islamic perspective.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt}
                category={post.category}
                image={post.image}
                date={post.date}
                readTime={post.readTime}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Have a Question About Your Situation?"
        text="Every relationship and personal situation is unique. Reach out for confidential guidance tailored to your circumstances."
        availability="Arabic and English consultations available."
      />
    </>
  );
}
