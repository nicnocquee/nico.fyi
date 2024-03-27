import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import { Space_Grotesk } from 'next/font/google'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${space_grotesk.variable} scroll-smooth`} suppressHydrationWarning>
      <body>
        {/* Layout UI */}
        <main>{children}</main>
      </body>
    </html>
  )
}
