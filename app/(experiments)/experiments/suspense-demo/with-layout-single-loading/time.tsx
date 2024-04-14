'use client'

import ClientOnly from '../../client-only'

export default function Time({ server }: { server: string }) {
  return (
    <ClientOnly>
      <p>Client: {new Date().toLocaleTimeString()}</p>
      <p>Server: {server}</p>
    </ClientOnly>
  )
}
