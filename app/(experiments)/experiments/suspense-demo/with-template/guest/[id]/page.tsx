import Link from 'next/link'
import { getServerTime } from '../../../get-server-time'
import { Alert } from '@/components/ui/alert'
import { allOthers } from '@/.contentlayer/generated'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'

export const dynamicParams = false
export const generateStaticParams = async () => {
  return [1, 2, 3].map((i) => ({ id: i.toString() }))
}

export default async function GuestPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const time = await getServerTime()
  let nextId = parseInt(params.id) + 1
  if (nextId > 3) nextId = 1
  const guestNote = allOthers.find((p) => p.slug === 'template-example-guest-page')

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col space-y-2 bg-slate-100 p-4 [&_a]:text-primary-500 [&_a]:underline">
        <p className="font-bold">Guest page {params.id}</p>
        <p>Server: {time}</p>
        <div className="flex flex-row space-x-2">
          <div className="flex flex-row space-x-2">
            <Link prefetch={false} href="/experiments/suspense-demo/with-template/">
              Root
            </Link>
            <Link
              prefetch={false}
              href={`/experiments/suspense-demo/with-template/admin/${nextId}`}
            >
              Next admin page
            </Link>
            <Link
              prefetch={false}
              href={`/experiments/suspense-demo/with-template/guest/${nextId}`}
            >
              Next guest page
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-lg">
        <Alert>
          <div className="[&_p]:mb-4">
            <MDXLayoutRenderer code={guestNote?.body.code || ''} components={components} />
          </div>
        </Alert>
      </div>
    </div>
  )
}
