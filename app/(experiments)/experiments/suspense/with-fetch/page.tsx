import { headers } from 'next/headers'
import Footer from '../footer'
import Albums from './albums'
import Songs from './songs'

export default function Page() {
  headers()

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Fetch Race Demo</h1>
      <div className="grid h-[400px] w-[400px] grid-cols-2 gap-4 overflow-scroll bg-gray-100 p-4">
        <Albums />
        <Songs />
      </div>
      <Footer />
    </div>
  )
}
