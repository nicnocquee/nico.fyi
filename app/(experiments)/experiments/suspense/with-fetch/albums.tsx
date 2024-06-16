'use client'

import { Album } from '../albums-data'
import Loading from '../loading'
import { useFetch } from './hooks'

export default function Albums() {
  const { data, loading, error } = useFetch<Album[]>('/experiments/suspense/with-fetch/api/albums')

  return (
    <div>
      <h1 className="text-xl font-bold">Albums</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <p>Error loading albums: {error.message}</p>
      ) : (
        <div className="flex flex-col space-y-4">
          {data.map((album) => (
            <div key={album.id} className="rounded-lg border border-gray-200 p-4">
              <h2>{album.name}</h2>
              <p>{album.artist}</p>
              <p>{album.year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
