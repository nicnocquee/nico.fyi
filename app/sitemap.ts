import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { displayablePosts } from '@/app/(blog)/blogs-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const blogRoutes = displayablePosts().map((post) => ({
    url: `${siteUrl}/${post.path}`,
    lastModified: post.lastmod || post.date,
  }))

  const routes = ['', 'blog', 'projects', 'tags', 'insights'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes]
}
