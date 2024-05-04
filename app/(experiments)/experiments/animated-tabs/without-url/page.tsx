'use client'

const tabs = [
  ['Home', dynamic(() => import('./home'))] as const,
  ['Integrations', dynamic(() => import('./integrations'))] as const,
  ['Monitor', dynamic(() => import('./monitor'))] as const,
] as const

import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { StateTabs } from './stateful-tabs'
import { useState } from 'react'
import Link from 'next/link'

export default function WithoutURLPage() {
  const [selectedTab, setSelectedTab] = useState(0)
  const Page = tabs[selectedTab][1]
  if (!Page) {
    notFound()
  }
  const withActiveTabs = tabs.map(([path], idx) => {
    return [path as string, path as string, idx === selectedTab] as const
  })
  return (
    <>
      <StateTabs
        tabs={withActiveTabs as []}
        onActiveTabChange={(path) => {
          setSelectedTab(tabs.findIndex(([p]) => p === path))
        }}
      />
      <p>
        The code for this page is in this{' '}
        <a href="https://github.com/nicnocquee/nico.fyi/tree/main/app/(experiments)/experiments/animated-tabs/without-url/page.tsx">
          file
        </a>
        . The blog post can be found{' '}
        <Link href="/blog/animated-nav-link-tabs-like-vercel">here</Link>.
      </p>
      <Page />
    </>
  )
}
