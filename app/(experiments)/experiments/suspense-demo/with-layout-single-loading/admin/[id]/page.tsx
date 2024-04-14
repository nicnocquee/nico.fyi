import Link from 'next/link'
import { getServerTime } from '../../../get-server-time'
import { Alert } from '@/components/ui/alert'

export default async function AdminPage({ params }: { params: { id: string } }) {
  const roles = ['admin', 'guest']
  const role = roles[Math.floor(Math.random() * roles.length)]
  const time = await getServerTime()
  const nextRandomId = Math.floor(Math.random() * 10000)
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col space-y-2 bg-slate-100 p-4 [&_a]:text-primary-500 [&_a]:underline">
        <p className="font-bold">Admin page {params.id}</p>
        <p>Server: {time}</p>
        <div className="flex flex-row space-x-2">
          <Link prefetch={false} href="/experiments/suspense-demo/with-layout-single-loading/">
            Root
          </Link>
          <Link
            prefetch={false}
            href={`/experiments/suspense-demo/with-layout-single-loading/admin/${nextRandomId}`}
          >
            Next admin page
          </Link>
          <Link
            prefetch={false}
            href={`/experiments/suspense-demo/with-layout-single-loading/guest/${nextRandomId}`}
          >
            Next guest page
          </Link>
          <Link
            prefetch={false}
            href={`/experiments/suspense-demo/with-layout-single-loading/${role}/${nextRandomId}`}
          >
            Next random page
          </Link>
        </div>
      </div>
      <div className="max-w-lg">
        <Alert>
          Notice that when you click any of the links above, the client time in layout above will
          not change because the component is not re-rendered. Unlike with template.
          <br />
          <br />
          In addition, if you type something in the search field, then navigate to another page, the
          text that you typed will not be lost.
        </Alert>
      </div>
    </div>
  )
}
