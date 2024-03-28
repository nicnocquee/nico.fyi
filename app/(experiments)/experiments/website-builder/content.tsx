'use client'

import { useWebsiteBuilder } from '@/components/website-builder'

export default function Content({ title }: { title: string }) {
  const { Link, Heading } = useWebsiteBuilder()
  return (
    <div>
      <Heading level={1}>{title}</Heading>
      <Link href="/">Home</Link>
    </div>
  )
}
