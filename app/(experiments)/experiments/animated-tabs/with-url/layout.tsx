import { ThemeProviders } from '@/app/theme-providers'
import Link from 'next/link'
import { LinkNavTabs } from '../../../../../components/animated-nav-tabs/link-nav-tabs'
import ThemeSwitch from '@/components/ThemeSwitch'

const tabs = [
  ['/experiments/animated-tabs/with-url/home', 'Home'],
  ['/experiments/animated-tabs/with-url/integrations', 'Integrations'],
  ['/experiments/animated-tabs/with-url/monitor', 'Monitor'],
].map(([path, label]) => ({
  label: (
    <Link key={path} prefetch={false} href={path}>
      {label}
    </Link>
  ),
  path,
}))

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProviders>
      <div className="bg-background">
        <div className="flex flex-row justify-between">
          <LinkNavTabs tabs={tabs} springy />
          <ThemeSwitch />
        </div>
        <p>
          The code for the animated tabs can be found{' '}
          <a
            className="text-primary-500 underline"
            href="https://github.com/nicnocquee/nico.fyi/tree/main/components/animated-nav-tabs"
          >
            here
          </a>
          . The blog post explaining this can be found{' '}
          <Link href="/blog/animated-nav-link-tabs-like-vercel">here</Link>.
        </p>
        {children}
      </div>
    </ThemeProviders>
  )
}
