import { AsyncLocalStorage } from 'async_hooks'
import { User } from './auth'

export const userContext = new AsyncLocalStorage<{
  user: User
}>()

export const getUserContext = () => {
  const store = userContext.getStore()
  if (!store) {
    throw new Error(
      'User context not found. The calling function must be wrapped in a userContext.run() block.'
    )
  }
  return store
}
