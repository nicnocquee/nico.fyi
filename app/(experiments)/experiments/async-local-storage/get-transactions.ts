import { getUserContext } from './user-context'

export type Transaction = {
  id: string
  amount: number
  date: string
}

export const getTransactions = async () => {
  const user = getUserContext()
  // use the user id to get the transactions from the database
  return [
    {
      id: '1',
      amount: 100,
      date: '2021-01-01',
    },
  ]
}
