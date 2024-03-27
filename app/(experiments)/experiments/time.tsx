'use client'

import { useEffect, useState } from 'react'

const TimeComponent = () => {
  const [date, setDate] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    setDate(new Date().toISOString())
  }, [])

  return <p>{date}</p>
}

export default TimeComponent
