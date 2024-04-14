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
          <Link prefetch={false} href="/experiments/suspense-demo/with-template-single-loading/">
            Root
          </Link>
          <Link
            prefetch={false}
            href={`/experiments/suspense-demo/with-template-single-loading/admin/${nextRandomId}`}
          >
            Next admin page
          </Link>
          <Link
            prefetch={false}
            href={`/experiments/suspense-demo/with-template-single-loading/guest/${nextRandomId}`}
          >
            Next guest page
          </Link>
          <Link
            prefetch={false}
            href={`/experiments/suspense-demo/with-template-single-loading/${role}/${nextRandomId}`}
          >
            Next random page
          </Link>
        </div>
      </div>
      <div className="max-w-lg">
        <Alert>
          Notice that when you click "Next admin page", the client time in template above{' '}
          <b>will not change</b>. This is because while the URL changes, the component that renders
          the page of that link is the same is the component that renders this page,
          app/(experiments)/experiments/suspense-demo/with-template-single-loading/admin/[id]/page.tsx.
          I don't know if this is a bug or by design.
          <br />
          <br />
          Meanwhile, if you click on the "Next guest page", the client time in template above{' '}
          <b>will change</b>. This is because the component that renders the page of that link,
          app/(experiments)/experiments/suspense-demo/with-template-single-loading/guest/[id]/page.tsx,
          is not the same as the component that renders this page.
          <br />
          <br />
          In other words, if the component of the children in the template.tsx doesn't change,
          Template behaves exactly like Layout.
          <br />
          <br />
          In addition, if you type something in the search field, then navigate to another{' '}
          <b>guest page</b>, the text that you typed will be lost because the search field component
          is re-rendered when the page component changes.
        </Alert>
      </div>
    </div>
  )
}
