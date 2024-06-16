import { songsData } from '../songs-data'

export default async function Songs({ dataSource }: { dataSource: ReturnType<typeof songsData> }) {
  const songs = await dataSource
  return (
    <div>
      <h1 className="text-xl font-bold">Songs</h1>
      {songs.map((song) => (
        <div key={song.id}>
          <h2>{song.name}</h2>
          <p>{song.album}</p>
          <p>{song.artist}</p>
          <p>{song.year}</p>
        </div>
      ))}
    </div>
  )
}
