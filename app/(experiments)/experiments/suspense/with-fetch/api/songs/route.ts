import { songsData } from '../../../songs-data'

export const GET = async (_request: Request) => {
  const data = await songsData()

  return Response.json(data)
}
