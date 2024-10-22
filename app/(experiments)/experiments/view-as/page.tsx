import Link from 'next/link'
import { fakeUserData } from './data'

export default async function Page(props: { searchParams: Promise<Record<string, string>> }) {
  const searchParams = await props.searchParams
  const user = fakeUserData[searchParams['user'] as keyof typeof fakeUserData]
  return (
    <div className="flex flex-col space-y-2 px-4 [&_a]:text-primary-500 [&_a]:underline">
      <div className="flex flex-col space-y-2">
        <Link href={{ search: '?user=john' }}>View as in John</Link>
        <Link href={{ search: '?user=dude' }}>View as in Dude</Link>
        <Link href={{ search: '?user=mary' }}>View as in Mary</Link>
        <Link href={{ search: '?user=albie' }}>View as in Albie</Link>
        <Link href={{ search: '?user=' }}>View as in you</Link>
      </div>
      <main className="flex flex-col space-y-2">
        <div className="h-full w-full rounded-lg bg-gray-200 p-4">
          <p>This is the main content for {user?.name || 'you'}</p>
        </div>
      </main>
    </div>
  )
}
