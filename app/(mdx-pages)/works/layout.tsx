import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Works',
  description:
    "These are some of the projects I've worked on in the Swift Management AG and Hyperjump Technology.",
}

export default function ProseLayout({ children }: { children: React.ReactNode }) {
  return <main className="prose max-w-none pb-8 dark:prose-invert">{children}</main>
}
