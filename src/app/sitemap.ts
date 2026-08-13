import type { MetadataRoute } from 'next';
import { services } from '@/data/services';
import { blogPosts } from '@/data/blog';

const siteUrl = 'https://maulana-hafiz-ali.vercel.app';

const staticPages = [
  { url: '', priority: 1.0 },
  { url: '/about', priority: 0.8 },
  { url: '/services', priority: 0.9 },
  { url: '/testimonials', priority: 0.6 },
  { url: '/blog', priority: 0.7 },
  { url: '/faq', priority: 0.6 },
  { url: '/contact', priority: 0.8 },
  { url: '/online-consultation', priority: 0.7 },
  { url: '/privacy-policy', priority: 0.3 },
  { url: '/terms-conditions', priority: 0.3 },
  { url: '/disclaimer', priority: 0.3 },
  { url: '/ar', priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePages = services.map((service) => ({
    url: `${siteUrl}/${service.slug}`,
    priority: 0.7 as const,
    lastModified: new Date(),
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    priority: 0.6 as const,
    lastModified: new Date(post.date),
  }));

  const pages = [
    ...staticPages.map((page) => ({
      url: `${siteUrl}${page.url}`,
      priority: page.priority as 1.0 | 0.9 | 0.8 | 0.7 | 0.6 | 0.3,
      lastModified: new Date(),
    })),
    ...servicePages,
    ...blogPages,
  ];

  return pages;
}
