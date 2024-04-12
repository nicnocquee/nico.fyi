export const Heading = ({ level, children }: { level: number; children: React.ReactNode }) => {
  switch (level) {
    case 1:
      return <h1 className="text-3xl font-bold">{children}</h1>
    case 2:
      return <h2 className="text-2xl font-bold">{children}</h2>
    case 3:
      return <h3 className="text-xl font-bold">{children}</h3>
    case 4:
      return <h4 className="text-lg font-bold">{children}</h4>
    case 5:
      return <h5 className="text-base font-bold">{children}</h5>
    case 6:
      return <h6 className="text-sm font-bold">{children}</h6>
    default:
      return <h3 className="text-xl font-bold">{children}</h3>
  }
}

export const Link = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a className="text-blue-700 underline" href={href}>
    {children}
  </a>
)
