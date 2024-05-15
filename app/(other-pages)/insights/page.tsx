import { allBlogs } from '@/.contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import {
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from 'date-fns'
import Link from 'next/link'

export const generateMetadata = async () => {
  return {
    title: 'Nico.fyi | Insights',
    description: 'Stats and insights about Nico.fyi powered by PostHog',
    robots: {
      index: false,
      follow: false,
      noindex: true,
      nofollow: true,
    },
    openGraph: {
      title: siteMetadata.title,
      description: siteMetadata.description,
      url: './',
      siteName: siteMetadata.title,
      images: [`${siteMetadata.siteUrl}/static/screenshots/insights.webp`],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: siteMetadata.title,
      card: 'summary_large_image',
      images: [`${siteMetadata.siteUrl}/static/screenshots/insights.webp`],
    },
  }
}

export const revalidate = 86400

export default function InsightsPage() {
  const thisWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 })
  const thisWeekEnd = endOfWeek(thisWeekStart)
  const thisWeek = `${format(thisWeekStart, 'yyyy-MM-dd')} - ${format(thisWeekEnd, 'dd')}`
  const thisMonthStart = startOfMonth(new Date())
  const thisMonthEnd = endOfMonth(thisMonthStart)
  const thisMonth = `${format(thisMonthStart, 'yyyy-MM-dd')} - ${format(thisMonthEnd, 'dd')}`
  const lastWeekStart = subWeeks(thisWeekStart, 1)
  const lastWeekEnd = endOfWeek(lastWeekStart)
  const lastWeek = `${format(lastWeekStart, 'yyyy-MM-dd')} - ${format(lastWeekEnd, 'dd')}`
  const lastMonthStart = subMonths(thisMonthStart, 1)
  const lastMonthEnd = endOfMonth(lastMonthStart)
  const lastMonth = `${format(lastMonthStart, 'yyyy-MM-dd')} - ${format(lastMonthEnd, 'dd')}`
  const numberOfPostsThisWeek = allBlogs.filter((b) => isAfter(b.date, thisWeekStart)).length
  const numberOfPostsLastWeek = allBlogs.filter(
    (b) => isAfter(b.date, lastWeekStart) && !isAfter(b.date, thisWeekStart)
  ).length
  const numberOfPostsThisMonth = allBlogs.filter((b) => isAfter(b.date, thisMonthStart)).length
  const numberOfPostsLastMonth = allBlogs.filter(
    (b) => isAfter(b.date, lastMonthStart) && !isAfter(b.date, thisMonthStart)
  ).length
  return (
    <div className="flex flex-col space-y-8">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        Insights
      </h1>
      <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
        This is a page for stats and insights about Nico.fyi powered by{' '}
        <Link href="https://www.nico.fyi/blog/how-to-show-popular-posts-using-posthog">
          PostHog
        </Link>
        .
      </p>

      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-bold">
          <a id={'posts-stats'} href={`#posts-stats`}>
            {'Number of posts'}
          </a>
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          {[
            [numberOfPostsThisWeek, 'This week', thisWeek],
            [numberOfPostsLastWeek, 'Last week', lastWeek],
            [numberOfPostsThisMonth, 'This month', thisMonth],
            [numberOfPostsLastMonth, 'Last month', lastMonth],
          ].map(([total, label, range], i) => {
            return (
              <div
                key={i}
                className="flex flex-col items-center space-y-4 rounded-md border border-gray-200 p-4 shadow-md"
              >
                <p className="text-7xl font-bold">{total}</p>
                <p>{label}</p>
                <p className="text-sm font-extralight text-gray-500">{range}</p>
              </div>
            )
          })}
        </div>
      </div>

      {[
        [
          'Unique visitors this month',
          'unique-visitors-this-month',
          'https://eu.posthog.com/embedded/782nw5OjRlQxVqV9lHsXKvUyTs77IA?refresh=true',
        ],
        [
          'Page view by path',
          'pageview-by-path',
          'https://eu.posthog.com/embedded/Uh-dD7vLEIlPzGiEREHn3xzQ3E234g?refresh=true',
        ],
        [
          'Weekly active users',
          'weekly-active-users',
          'https://eu.posthog.com/embedded/AQM_F4DRz2eRgCeYzpeWBFwsHYI-VQ?refresh=true',
        ],
        [
          'Page view by country',
          'pageview-by-country',
          'https://eu.posthog.com/embedded/cUu6_GTpj41KC1AHVZdZDWTgyszHBA?refresh=true',
        ],
        [
          'Page view by country in Bar Chart',
          'pageview-by-country-bar-chart',
          'https://eu.posthog.com/shared/Jsq7RdOaTiPr1i_Z8YuBSHb9QPOrFA?refresh=true',
        ],
        [
          'Page view by browser',
          'pageview-by-browser',
          'https://eu.posthog.com/embedded/EVWqyDeCEnblyb6k1CYPiVfnjSp1yw?refresh=true',
        ],
        [
          'Page view by Referring Domain',
          'pageview-by-referring-domain',
          'https://eu.posthog.com/shared/qKij9bDD1SVSdA4vfdlg-ZtVW7LWvw?refresh=true',
        ],
      ].map(([title, anchor, url]) => {
        return (
          <div key={url} className="flex flex-col space-y-4">
            <h2 className="text-xl font-bold">
              <a id={anchor} href={`#${anchor}`}>
                {title}
              </a>
            </h2>
            <iframe
              key={url}
              title={title}
              width="100%"
              height="600"
              allowFullScreen
              src={url}
            ></iframe>
          </div>
        )
      })}
    </div>
  )
}
