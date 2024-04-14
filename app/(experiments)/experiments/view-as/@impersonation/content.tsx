import { fakeUserData } from '../data'

export default async function Content({ user }: { user?: string }) {
  if (user) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const userData = fakeUserData[user as keyof typeof fakeUserData]
    if (userData) {
      return <div>Viewing this page as {userData.name}</div>
    }
  }
  return <div>Viewing this page as yourself</div>
}
