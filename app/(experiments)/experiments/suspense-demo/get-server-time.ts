import 'server-only'

export const getServerTime = async (withDelay = true) => {
  if (withDelay) {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // fake delay
  }
  return new Date().toLocaleTimeString()
}
