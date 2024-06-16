import { getTime } from './utils'

export const songsData = async () => {
  console.log('songsData', getTime())
  // get the songs data from a database or API
  await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 10000))

  // if (!process.env.IS_BUILDING) {
  //   if (Math.random() < 0.5) {
  //     throw new Error('Fake error: something went wrong')
  //   }
  // }

  const songs = []
  for (let i = 0; i < 100; i++) {
    songs.push({
      id: i + 1,
      name: `Song ${i + 1}`,
      album: `Album ${i + 1}`,
      artist: `Artist ${i + 1}`,
      year: 2022 + i,
    })
  }

  return songs
}

export type Song = {
  id: number
  name: string
  album: string
  artist: string
  year: number
}
