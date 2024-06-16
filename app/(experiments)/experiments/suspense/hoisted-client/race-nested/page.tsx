import { headers } from 'next/headers'
import Albums from './albums'
import Songs from './songs'
import { albumsData } from '../../albums-data'
import { songsData } from '../../songs-data'
import Footer from '../../footer'

export default function Page() {
  headers()

  const getAlbumsData = albumsData() // returns a promise but we don't need to await it
  const getSongsData = songsData() // returns a promise but we don't need to await it

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Suspense Hoisted Race Demo</h1>
      <div className="grid h-[400px] w-[400px] grid-cols-2 gap-4 overflow-scroll bg-gray-100 p-4">
        <Albums dataSource={getAlbumsData} />
        <Songs dataSource={getSongsData} />
      </div>
      <Footer />
    </div>
  )
}
