export default function ProseLayout({ children }: { children: React.ReactNode }) {
  return <main className="prose max-w-none pb-8 dark:prose-invert">{children}</main>
}
