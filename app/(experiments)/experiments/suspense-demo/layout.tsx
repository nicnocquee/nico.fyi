import Link from 'next/link'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex  flex-row space-y-2 p-4 font-sans text-black [&_a]:text-primary-500 [&_a]:underline">
      <div className="flex flex-col space-y-2 bg-slate-100 p-4">
        <Link prefetch={false} href="/experiments/suspense-demo/with-layout/">
          With Layout demo
        </Link>
        <Link prefetch={false} href={`/experiments/suspense-demo/with-template`}>
          With Template demo
        </Link>
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  )
}
