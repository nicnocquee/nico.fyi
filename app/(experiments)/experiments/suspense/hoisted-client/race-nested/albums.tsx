'use client'
import { Suspense, use } from 'react'
import { albumsData } from '../../albums-data'
import ErrorBoundaryWithFallback from '../../fallback-error'

export default function Albums({ dataSource }: { dataSource: ReturnType<typeof albumsData> }) {
  return (
    <div>
      <h1 className="text-xl font-bold">Albums</h1>
      <ErrorBoundaryWithFallback>
        <Suspense fallback={<div>Loading albums...</div>}>
          <AlbumsList dataSource={dataSource} />
        </Suspense>
      </ErrorBoundaryWithFallback>
    </div>
  )
}

function AlbumsList({ dataSource }: { dataSource: ReturnType<typeof albumsData> }) {
  const albums = use(dataSource)

  return (
    <>
      {albums.map((album) => (
        <div key={album.id}>
          <h2>{album.name}</h2>
          <p>{album.artist}</p>
          <p>{album.year}</p>
        </div>
      ))}
    </>
  )
}
