import Time from './time'
import { getServerTime } from '../get-server-time'
import SearchField from '../search-field'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const time = await getServerTime()
  return (
    <div className="flex h-screen flex-col space-y-2 p-4 font-sans text-black">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          This is a dashboard in a Layout
        </h1>
        <div>
          <p className="font-bold">Time in layout:</p>
          <Time server={time} />
        </div>
        <SearchField />
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  )
}
