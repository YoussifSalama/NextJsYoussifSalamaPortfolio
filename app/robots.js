import { getProfile } from '@/lib/db';

export default async function robots() {
  const profile = await getProfile();
  const base = (profile.seo && profile.seo.siteUrl) || '';
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api'] }
    ],
    sitemap: base ? `${base}/sitemap.xml` : undefined
  };
}
