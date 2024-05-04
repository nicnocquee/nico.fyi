export default function InsightsPage() {
  return (
    <div className="flex flex-col space-y-8">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        Insights
      </h1>
      <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
        This is a page for nico.fyi insights.
      </p>
      <iframe
        title="nico.fyi insights by pages"
        width="100%"
        height="400"
        frameBorder="0"
        allowFullScreen
        src="https://eu.posthog.com/embedded/Uh-dD7vLEIlPzGiEREHn3xzQ3E234g"
      ></iframe>

      <iframe
        title="nico.fyi insights by country"
        width="100%"
        height="600"
        frameBorder="0"
        allowFullScreen
        src="https://eu.posthog.com/embedded/cUu6_GTpj41KC1AHVZdZDWTgyszHBA"
      ></iframe>
    </div>
  )
}
