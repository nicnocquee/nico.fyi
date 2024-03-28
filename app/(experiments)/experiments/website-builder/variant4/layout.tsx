'use client'
import {
  WebsiteBuilderProvider,
  defaultWebsiteBuilderValue,
} from '@/components/website-builder-dynamic'
import { Heading, Link } from './components'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WebsiteBuilderProvider
      value={{
        ...defaultWebsiteBuilderValue,
        Heading,
        Link,
      }}
    >
      {children}
    </WebsiteBuilderProvider>
  )
}
