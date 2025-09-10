import { getRequestContext } from '../request-context'
import { getUserContext } from '../user-context'

export const getData = async () => {
  const requestStore = getRequestContext()
  const userStore = getUserContext()

  const { searchParams, params } = requestStore

  const sort = searchParams.sort || 'asc'
  const id = params.id
  const user = userStore.user

  // do something with the user, sort, and id, e.g., fetch data from a database
  console.log(user, sort, id)

  return { user, sort, id }
}
