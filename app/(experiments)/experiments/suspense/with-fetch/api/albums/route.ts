import { albumsData } from '../../../albums-data'

export const GET = async (_request: Request) => {
  const data = await albumsData()

  return Response.json(data)
}
