import './globals.css';
import { getProfile } from '@/lib/db';

export async function generateMetadata() {
  const profile = await getProfile();
  const seo = profile.seo || {};
  const hero = profile.hero || {};
  const siteUrl = seo.siteUrl || '';
  return {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: hero.name ? [{ name: hero.name }] : undefined,
    alternates: siteUrl ? { canonical: '/' } : undefined,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'website',
      url: siteUrl || undefined,
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      site: seo.twitterHandle || undefined,
      images: seo.ogImage ? [seo.ogImage] : undefined
    },
    robots: { index: true, follow: true }
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#070a12'
};

export default async function RootLayout({ children }) {
  const profile = await getProfile();
  const hero = profile.hero || {};
  const seo = profile.seo || {};
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: hero.name,
    jobTitle: hero.title,
    email: hero.email,
    url: seo.siteUrl || undefined,
    sameAs: [hero.linkedin].filter(Boolean),
    address: hero.location ? { '@type': 'PostalAddress', addressLocality: hero.location } : undefined
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
