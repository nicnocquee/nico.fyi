export const GET = async (_request: Request) => {
  await new Promise((resolve) => setTimeout(resolve, 10000))

  return Response.json({ message: 'Hello, world!' })
}
