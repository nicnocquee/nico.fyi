import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Open Source',
  description: "These are some of the open-source projects I've worked on.",
}

export default function ProseLayout({ children }: { children: React.ReactNode }) {
  return <main className="prose max-w-none pb-8 dark:prose-invert">{children}</main>
}
