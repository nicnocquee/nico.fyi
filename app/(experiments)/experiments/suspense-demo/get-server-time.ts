import 'server-only'

export const getServerTime = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // fake delay
  return new Date().toLocaleTimeString()
}
