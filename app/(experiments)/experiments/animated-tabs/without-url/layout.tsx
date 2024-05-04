import { ThemeProviders } from '@/app/theme-providers'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProviders>
      <div className="bg-background [&_a]:text-primary-500 [&_a]:underline">{children}</div>
    </ThemeProviders>
  )
}
