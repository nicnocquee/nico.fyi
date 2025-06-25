import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { routes } from '../(blog)/blog/routes'
import { Blog } from '@/.contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import { PopularBlogs } from '../(blog)/components/popular'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const MAX_DISPLAY = 5

export default function Home({ posts }: { posts: CoreContent<Blog>[] }) {
  return (
    <div className="flex flex-col space-y-4">
      <PopularBlogs />

      <div className="divide-y divide-gray-200 py-8 dark:divide-gray-700">
        <Alert>
          <AlertTitle>Recent news</AlertTitle>
          <AlertDescription>
            <div className="flex flex-col space-y-2 [&>a]:hover:text-primary-600 [&>a]:dark:hover:text-primary-400 [&_a]:mx-2 [&_a]:inline-block [&_a]:text-primary-500">
              <ul className="list-disc pl-5">
                <li>
                  Bluesky later: Schedule Bluesky post in the future for FREE
                  <a href="https://www.blueskylater.com">www.blueskylater.com</a>
                </li>
                <li>
                  Have you checked out my new book?
                  <a href="https://pr.nico.fyi">Pull Request Best Practices &rarr;</a>
                </li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            🆕 Latest
          </h1>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, commentary, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={routes.blogPage({ slug: [slug] })}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {commentary || summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </div>
  )
}
