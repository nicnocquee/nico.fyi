import { Suspense } from 'react'
import Content from './content'

export default async function Page({ searchParams }: { searchParams: Record<string, string> }) {
  const user = searchParams['user'] as string

  return (
    <Suspense key={user || 'you'} fallback={<div>Loading...</div>}>
      <Content user={user} />
    </Suspense>
  )
}
