import { MetadataRoute } from 'next'
import { getProgramSlugs, getEvents, getNews } from '@/lib/cms'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bfriends.id'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/journey`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/journey-partners`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/treatments`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/spa/spa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/spa/facials`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/spa/hair`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/spa/nails`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/community/event-workshop`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/community/journal`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/membership/bfriends-passport`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/membership/charm`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  let programPages: MetadataRoute.Sitemap = []
  let eventPages: MetadataRoute.Sitemap = []
  let newsPages: MetadataRoute.Sitemap = []

  try {
    const slugs = await getProgramSlugs()
    programPages = slugs.map((slug) => ({
      url: `${SITE_URL}/programs/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

    const events = await getEvents()
    eventPages = events.map((e: any) => ({
      url: `${SITE_URL}/community/event/${e.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    const news = await getNews()
    newsPages = news.map((n: any) => ({
      url: `${SITE_URL}/community/news/${n.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  } catch {
    // DB not available, return static pages only
  }

  return [...staticPages, ...programPages, ...eventPages, ...newsPages]
}
