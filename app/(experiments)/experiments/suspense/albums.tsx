import { Suspense } from 'react'
import { albumsData, relatedAlbums } from './albums-data'

export default async function Albums() {
  const albums = await albumsData()
  return (
    <div>
      <h1 className="text-xl font-bold">Albums</h1>
      {albums.map((album) => (
        <div key={album.id}>
          <h2>{album.name}</h2>
          <p>{album.artist}</p>
          <p>{album.year}</p>
          <Suspense fallback={<div>Loading related...</div>}>
            <RelatedAlbums albumId={album.id} />
          </Suspense>
        </div>
      ))}
    </div>
  )
}

const RelatedAlbums = async ({ albumId }: { albumId: number }) => {
  const albums = await relatedAlbums(albumId)
  return (
    <div>
      <h1 className="text-xl font-bold">Related Albums</h1>
      {albums.map((album) => (
        <div key={album.id}>
          <h2>{album.name}</h2>
          <p>{album.artist}</p>
          <p>{album.year}</p>
        </div>
      ))}
    </div>
  )
}
