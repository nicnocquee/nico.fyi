import { getTransactions } from './get-transactions'
import { getUserContext } from './user-context'

export type Profile = {
  id: string
  name: string
  email: string
}

export const getProfile = async () => {
  const user = getUserContext()
  return {
    id: `${user.user.id}-profile`,
    name: user.user.name,
    email: user.user.email,
    transactions: await getTransactions(),
  }
}
