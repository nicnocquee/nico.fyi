import { getTime } from './utils'

export const albumsData = async () => {
  console.log('albumsData', getTime())
  // get the albums data from a database or API
  await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 10000))

  // if (!process.env.IS_BUILDING) {
  //   if (Math.random() < 0.5) {
  //     throw new Error('Fake error: something went wrong')
  //   }
  // }

  const albums = []
  for (let i = 0; i < 100; i++) {
    albums.push({
      id: i + 1,
      name: `Album ${i + 1}`,
      artist: `Artist ${i + 1}`,
      year: 2022 + i,
    })
  }

  return albums
}

export type Album = {
  id: number
  name: string
  artist: string
  year: number
}

export const relatedAlbums = async (_albumId: number) => {
  console.log('relatedAlbums', getTime())
  // get the albums data from a database or API
  await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 10000))

  // if (!process.env.IS_BUILDING) {
  //   if (Math.random() < 0.5) {
  //     throw new Error('Fake error: something went wrong')
  //   }
  // }

  const albums = []
  for (let i = 0; i < 3; i++) {
    albums.push({
      id: i + 1,
      name: `Album ${i + 1}`,
      artist: `Artist ${i + 1}`,
      year: 2022 + i,
    })
  }

  return albums
}
