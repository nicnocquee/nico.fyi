export default function Layout({
  children,
  impersonation,
}: {
  children: React.ReactNode
  impersonation: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col space-y-2 p-4 font-sans text-black">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          This is a dashboard
        </h1>
        {impersonation} {/* Render impersonation here */}
      </div>
      <div className="flex flex-col">{children}</div> {/* Render children here */}
    </div>
  )
}
