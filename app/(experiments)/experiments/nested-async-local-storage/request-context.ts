import { AsyncLocalStorage } from 'async_hooks'

export const requestContext = new AsyncLocalStorage<{
  searchParams: Record<string, string>
  params: Record<string, string>
  body: Record<string, any>
}>()

export const getRequestContext = () => {
  const store = requestContext.getStore()
  if (!store) {
    throw new Error(
      'Request context not found. The calling function must be wrapped in a requestContext.run() block.'
    )
  }
  return store
}
