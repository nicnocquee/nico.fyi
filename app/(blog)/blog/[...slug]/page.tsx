import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allAuthors } from 'contentlayer/generated'
import type { Authors, Blog } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import { displayablePosts } from '@/app/(blog)/blogs-data'
import { routes } from '../routes'
import { PopularBlogs } from '../../components/popular'
import { Promo } from './promo'
import { env } from '@/env'
import { Alert } from '@/components/ui/alert'

export const revalidate = 60
export const dynamicParams = true

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const post = displayablePosts(true).find((p) => p.slug === slug)
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  if (!post) {
    return
  }

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  const imageList = [`${siteMetadata.siteUrl}/static/screenshots/blog/${post.slug}.webp`]

  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  const keywords = Array.from(
    new Set([
      ...post.keywords.map((t) => t.toLowerCase()),
      ...post.tags.map((t) => t.toLowerCase()),
    ])
  )

  return {
    title: post.title,
    description: post.summary,
    keywords,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}

export const generateStaticParams = async () => {
  const paths = displayablePosts(true).map((p) => ({ slug: p.slug.split('/') }))

  return paths
}

const showFuturePosts =
  !!env.NEXT_PUBLIC_SHOW_ALL_POSTS && env.NEXT_PUBLIC_SHOW_ALL_POSTS === 'true'

export default async function Page(props: { params: Promise<typeof routes.blogPage.params> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))

  const posts = displayablePosts(true)

  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(posts)
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (postIndex === -1) {
    return notFound()
  }

  let prev: (typeof sortedCoreContents)[number] | undefined = sortedCoreContents[postIndex + 1]
  if (prev && !showFuturePosts && new Date(prev.date) > new Date()) {
    prev = undefined
  }
  let next: (typeof sortedCoreContents)[number] | undefined = sortedCoreContents[postIndex - 1]
  if (next && !showFuturePosts && new Date(next.date) > new Date()) {
    next = undefined
  }
  const post = posts.find((p) => p.slug === slug) as Blog
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  const mainContent = coreContent(post)
  const jsonLd = post.structuredData
  jsonLd['author'] = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
    }
  })

  const Layout = layouts[(post.layout || defaultLayout) as keyof typeof layouts]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Promo />
      <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
        <Alert className="duration-1000 animate-in fade-in-0">
          <span className="inline-block animate-bounce text-2xl">🥳</span> Thank you for reading
          until the end! Can I bother you to check my latest project{' '}
          <a href="https://dataqueue.dev" target="_blank" rel="noopener noreferrer">
            DataQueue.dev
          </a>
          ? Greatly appreciate it!
        </Alert>
      </Layout>
      <PopularBlogs />
    </>
  )
}
