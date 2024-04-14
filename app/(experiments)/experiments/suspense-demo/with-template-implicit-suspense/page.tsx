import Link from 'next/link'

export default async function Page() {
  const roles = ['admin', 'guest']
  const role = roles[Math.floor(Math.random() * roles.length)]
  return (
    <div className="flex flex-col space-y-2 [&_a]:text-primary-500 [&_a]:underline">
      <Link
        prefetch={false}
        href={`/experiments/suspense-demo/with-template-implicit-suspense/${role}/${Math.floor(Math.random() * 10000)}`}
      >
        Start to next page
      </Link>
    </div>
  )
}
