import { allBlogs } from '@/.contentlayer/generated'
import { PosthogSchema } from './posthog'
import Link from 'next/link'

export const PopularBlogsList = async () => {
  const response = await fetch(
    `https://eu.posthog.com/api/projects/${process.env.POSTHOG_PROJECT_ID}/insights/${process.env.POSTHOG_INSIGHT_ID}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.POSTHOG_API_KEY}`,
      },
    }
  )

  const jsonData = await response.json()
  const { result } = await PosthogSchema.parseAsync(jsonData)

  const posts = result
    .filter((post) => post.label.startsWith('/blog'))
    .map((post) => {
      const thePost = allBlogs.find((p) => post.label.indexOf(p.slug) !== -1)
      return {
        path: post.label,
        count: post.count,
        title: thePost?.title,
      }
    })
    .filter((_, i) => i < 6)

  if (posts.length === 0) {
    return null
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {posts.map((post) => (
        <div
          key={post.path}
          className="flex flex-col justify-between rounded-lg border border-gray-200 p-4 py-4 shadow-sm dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold leading-8 tracking-tight">
            <Link href={post.path}>{post.title}</Link>
          </h2>
          <Link
            href={post.path}
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Read more: "${post.title}"`}
          >
            Read more &rarr;
          </Link>
        </div>
      ))}
    </div>
  )
}

export const PopularBlogs = () => {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          🔥 Popular this week
        </h2>
      </div>
      <div className="py-12">
        <PopularBlogsList />
      </div>
    </div>
  )
}
