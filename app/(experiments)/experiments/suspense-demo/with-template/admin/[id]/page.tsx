import Link from 'next/link'
import { getServerTime } from '../../../get-server-time'
import { Alert } from '@/components/ui/alert'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'
import { allOthers } from '@/.contentlayer/generated'

export default async function AdminPage({ params }: { params: { id: string } }) {
  const roles = ['admin', 'guest']
  const role = roles[Math.floor(Math.random() * roles.length)]
  const time = await getServerTime()
  const nextRandomId = Math.floor(Math.random() * 10000)

  const adminNote = allOthers.find((p) => p.slug === 'template-example-admin-page')

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col space-y-2 bg-slate-100 p-4 [&_a]:text-primary-500 [&_a]:underline">
        <p className="font-bold">Admin page {params.id}</p>
        <p>Server: {time}</p>
        <div className="flex flex-row space-x-2">
          <Link prefetch={false} href="/experiments/suspense-demo/with-template/">
            Root
          </Link>
          <Link
            prefetch={false}
            href={`/experiments/suspense-demo/with-template/admin/${nextRandomId}`}
          >
            Next admin page
          </Link>
          <Link
            prefetch={false}
            href={`/experiments/suspense-demo/with-template/guest/${nextRandomId}`}
          >
            Next guest page
          </Link>
          <Link
            prefetch={false}
            href={`/experiments/suspense-demo/with-template/${role}/${nextRandomId}`}
          >
            Next random page
          </Link>
        </div>
      </div>
      <div className="max-w-lg">
        <Alert>
          <div className="[&_p]:mb-4">
            <MDXLayoutRenderer code={adminNote?.body.code || ''} components={components} />
          </div>
        </Alert>
      </div>
    </div>
  )
}
