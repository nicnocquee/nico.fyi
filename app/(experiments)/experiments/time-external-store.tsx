'use client'

import { useSyncExternalStore } from 'react'

const TimeComponentWithExternalStore = () => {
  const date = useSyncExternalStore(
    () => () => {},
    () => new Date().toISOString(),
    () => ''
  )

  return <p>{date}</p>
}

export default TimeComponentWithExternalStore
