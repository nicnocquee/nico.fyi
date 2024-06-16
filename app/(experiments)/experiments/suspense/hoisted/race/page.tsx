import { Suspense } from 'react'

import { headers } from 'next/headers'
import Albums from '../albums'
import Songs from '../songs'
import { albumsData } from '../../albums-data'
import { songsData } from '../../songs-data'
import Loading from '../../loading'
import Footer from '../../footer'
import ErrorBoundaryWithFallback from '../../fallback-error'

export default function Page() {
  headers()

  return (
    <div>
      <h1 className="text-xl font-bold">Suspense Hoisted Race Demo</h1>
      <div className="grid h-[400px] w-[400px] grid-cols-2 gap-4 overflow-scroll bg-gray-100 p-4">
        <ErrorBoundaryWithFallback>
          <Suspense fallback={<Loading />}>
            <Albums dataSource={albumsData()} />
          </Suspense>
        </ErrorBoundaryWithFallback>
        <ErrorBoundaryWithFallback>
          <Suspense fallback={<Loading />}>
            <Songs dataSource={songsData()} />
          </Suspense>
        </ErrorBoundaryWithFallback>
      </div>
      <Footer />
    </div>
  )
}
