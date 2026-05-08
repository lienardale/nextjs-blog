import type {MetadataRoute} from 'next';
import {routing} from '../lib/i18n/routing';

const baseUrl = 'https://alienard.vercel.app';

const categories: Record<string, string[]> = {
  experience: ['Junior-42-Paris', 'ESF-Sciences-Humaines', 'Editions-Denoel', 'Flammarion'],
  education: ['42-Paris', 'IAE-Lille', 'CPGE_BL'],
  skills: ['projects', 'soft-skills', 'stack'],
  about_me: ['infos', 'languages', 'cv'],
  hobbies: ['graphic-novels'],
  posts: ['ssg-ssr', 'pre-rendering', 'building-modern-blog', 'typescript-react-patterns', 'next-intl-guide'],
};

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const entries: MetadataRoute.Sitemap = [];

  // Home pages
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    });
  }

  // Category overview + detail pages
  for (const [category, ids] of Object.entries(categories)) {
    for (const locale of locales) {
      // Overview page
      entries.push({
        url: `${baseUrl}/${locale}/${category}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });

      // Detail pages
      for (const id of ids) {
        entries.push({
          url: `${baseUrl}/${locale}/${category}/${id}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      }
    }
  }

  return entries;
}
