import siteMetadata from '@/data/siteMetadata'

export const generateMetadata = async () => {
  return {
    title: 'Insights',
    description: 'Insights from Posthog',
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

export default function InsightsPage() {
  return (
    <div className="flex flex-col space-y-8">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        Insights
      </h1>
      <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
        This is a page for nico.fyi insights.
      </p>

      {[
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
          'Page view by browser',
          'pageview-by-browser',
          'https://eu.posthog.com/embedded/EVWqyDeCEnblyb6k1CYPiVfnjSp1yw?refresh=true',
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
