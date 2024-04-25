// app/providers.js
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

if (typeof window !== 'undefined') {
  // @ts-expect-error
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  })
}
export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}

export const VercelAnalytics = () => {
  return (
    <>
      <Analytics
        beforeSend={(data) => {
          if (data.url.includes('/experiments/')) {
            return null // this will ignore the event
          }
          return data // this will send the event as is
        }}
      />
      <SpeedInsights
        sampleRate={0.5}
        beforeSend={(data) => {
          if (data.url.includes('/experiments/')) {
            return null // this will ignore the event
          }
          return data // this will send the event as is
        }}
      />
    </>
  )
}
