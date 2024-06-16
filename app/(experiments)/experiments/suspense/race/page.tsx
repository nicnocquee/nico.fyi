import { Suspense } from 'react'
import Albums from '../albums'
import Songs from '../songs'
import { headers } from 'next/headers'
import Loading from '../loading'
import Footer from '../footer'
import ErrorBoundaryWithFallback from '../fallback-error'

export default function Page() {
  headers()

  return (
    <div>
      <h1 className="text-xl font-bold">Suspense Demo</h1>
      <div className="grid h-[400px] w-[400px] grid-cols-2 gap-4 overflow-scroll bg-gray-100 p-4">
        <ErrorBoundaryWithFallback>
          <Suspense fallback={<Loading />}>
            <Albums />
          </Suspense>
        </ErrorBoundaryWithFallback>
        <ErrorBoundaryWithFallback>
          <Suspense fallback={<Loading />}>
            <Songs />
          </Suspense>
        </ErrorBoundaryWithFallback>
      </div>
      <Footer />
    </div>
  )
}
