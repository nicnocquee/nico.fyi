'use client'

import { Song } from '../songs-data'
import Loading from '../loading'
import { useFetch } from './hooks'

export default function Songs() {
  const { data, loading, error } = useFetch<Song[]>('/experiments/suspense/with-fetch/api/songs')

  return (
    <div>
      <h1 className="text-xl font-bold">Songs</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <p>Error loading songs: {error.message}</p>
      ) : (
        <div className="flex flex-col space-y-4">
          {data.map((song) => (
            <div key={song.id} className="rounded-lg border border-gray-200 p-4">
              <h2>{song.name}</h2>
              <p>{song.artist}</p>
              <p>{song.year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
