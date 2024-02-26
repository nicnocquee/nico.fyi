'use client'
import { ReactNode, useSyncExternalStore } from 'react'

const ClientOnly = ({ children }: { children: ReactNode }) => {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  if (isClient) {
    return <>{children}</>
  }

  return null
}

export default ClientOnly
