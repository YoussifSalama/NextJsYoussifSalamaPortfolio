import { getProfile, getProjects } from '@/lib/db';

export default async function sitemap() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);
  const base = (profile.seo && profile.seo.siteUrl) || '';

  const entries = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 }
  ];
  for (const p of projects) {
    entries.push({
      url: `${base}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    });
  }
  return entries;
}
