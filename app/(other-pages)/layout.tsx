import MainLayout, { MainLayoutChildren } from '@/app/main-layout'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout>
      <MainLayoutChildren>{children}</MainLayoutChildren>
    </MainLayout>
  )
}
