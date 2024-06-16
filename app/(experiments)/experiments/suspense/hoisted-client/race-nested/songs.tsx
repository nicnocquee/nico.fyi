'use client'
import { Suspense, use } from 'react'
import { songsData } from '../../songs-data'
import ErrorBoundaryWithFallback from '../../fallback-error'

export default function Songs({ dataSource }: { dataSource: ReturnType<typeof songsData> }) {
  return (
    <div>
      <h1 className="text-xl font-bold">Songs</h1>
      <ErrorBoundaryWithFallback>
        <Suspense fallback={<div>Loading songs...</div>}>
          <SongsList dataSource={dataSource} />
        </Suspense>
      </ErrorBoundaryWithFallback>
    </div>
  )
}

function SongsList({ dataSource }: { dataSource: ReturnType<typeof songsData> }) {
  const songs = use(dataSource)

  return (
    <>
      {songs.map((song) => (
        <div key={song.id}>
          <h2>{song.name}</h2>
          <p>{song.album}</p>
          <p>{song.artist}</p>
          <p>{song.year}</p>
        </div>
      ))}
    </>
  )
}
