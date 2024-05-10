// app/providers.js
'use client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { Button } from '@/components/ui/button'
import { usePostHog } from 'posthog-js/react'
import { useEffect, useState } from 'react'
import { env } from '@/app/env'

if (typeof window !== 'undefined' && env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
    persistence: cookieConsentGiven() === 'yes' ? 'localStorage+cookie' : 'memory',
  })
}
export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}

export function cookieConsentGiven() {
  if (!localStorage.getItem('cookie_consent')) {
    return 'undecided'
  }
  return localStorage.getItem('cookie_consent')
}

export function CookieBanner() {
  const [consentGiven, setConsentGiven] = useState<string | null>('')
  const posthog = usePostHog()

  useEffect(() => {
    // We want this to only run once the client loads
    // or else it causes a hydration error
    setConsentGiven(cookieConsentGiven())
  }, [])

  useEffect(() => {
    if (consentGiven !== '') {
      posthog.set_config({ persistence: consentGiven === 'yes' ? 'localStorage+cookie' : 'memory' })
    }
  }, [consentGiven, posthog])

  const handleAcceptCookies = () => {
    localStorage.setItem('cookie_consent', 'yes')
    setConsentGiven('yes')
  }

  const handleDeclineCookies = () => {
    localStorage.setItem('cookie_consent', 'no')
    setConsentGiven('no')
  }

  return (
    <div>
      {consentGiven === 'undecided' && (
        <div className="fixed bottom-0 w-full space-y-4 border-t border-t-foreground/10 bg-background p-4 text-center text-sm">
          <p>
            Hey, I use cookies to see how you use the website and make it better. Can you cool with
            that and let me use 'em?
          </p>
          <Button variant={'secondary'} onClick={handleAcceptCookies}>
            Accept
          </Button>
          <span> </span>
          <Button variant={'outline'} onClick={handleDeclineCookies}>
            Decline
          </Button>
        </div>
      )}
    </div>
  )
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
