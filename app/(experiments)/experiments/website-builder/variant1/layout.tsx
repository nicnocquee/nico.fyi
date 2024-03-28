'use client'
import { WebsiteBuilderProvider, defaultWebsiteBuilderValue } from '@/components/website-builder'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WebsiteBuilderProvider value={defaultWebsiteBuilderValue}>{children}</WebsiteBuilderProvider>
  )
}
