import { albumsData } from '../albums-data'

export default async function Albums({
  dataSource,
}: {
  dataSource: ReturnType<typeof albumsData>
}) {
  const albums = await dataSource
  return (
    <div>
      <h1 className="text-xl font-bold">Albums</h1>
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
