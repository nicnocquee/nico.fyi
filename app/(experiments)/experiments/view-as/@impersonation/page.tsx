import { Suspense } from 'react'
import Content from './content'

export default async function Page(props: { searchParams: Promise<Record<string, string>> }) {
  const searchParams = await props.searchParams
  const user = searchParams['user'] as string

  return (
    <Suspense key={user || 'you'} fallback={<div>Loading...</div>}>
      <Content user={user} />
    </Suspense>
  )
}
