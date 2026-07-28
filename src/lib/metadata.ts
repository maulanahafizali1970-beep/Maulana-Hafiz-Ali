import { Metadata } from 'next';

const siteUrl = 'https://www.maulanahafizali.com';
const siteName = 'Maulana Hafiz Ali | Islamic Love, Marriage & Spiritual Guidance';
const defaultDescription =
  'Receive confidential Islamic spiritual and relationship guidance from Maulana Hafiz Ali for love, marriage, family, separation and emotional concerns. Arabic and English online consultation available.';

export function createMetadata(override?: Partial<Metadata>): Metadata {
  const title = override?.title
    ? typeof override.title === 'string'
      ? `${override.title} | Maulana Hafiz Ali`
      : siteName
    : siteName;

  const description = (override?.description as string) || defaultDescription;

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: typeof title === 'string' ? title : siteName,
      description,
      siteName,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: typeof title === 'string' ? title : siteName,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
    ...override,
  };
}
