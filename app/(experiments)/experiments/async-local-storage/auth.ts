export type User = {
  id: string
  name: string
  email: string
}

export const auth = async () => {
  return {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
  }
}
