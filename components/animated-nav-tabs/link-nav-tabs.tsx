'use client'

import { usePathname } from 'next/navigation'
import { AnimatedNavTabs } from './animated-nav-tabs'

export const LinkNavTabs = ({
  tabs,
  springy,
}: {
  tabs: Array<{ label: React.ReactNode; path: string }>
  springy?: boolean
}) => {
  const pathname = usePathname()
  const runtimeTabs = tabs.map((tab) => ({
    label: tab.label,
    path: tab.path,
    active: pathname === tab.path,
  }))

  return <AnimatedNavTabs tabs={runtimeTabs} springy={springy} />
}
