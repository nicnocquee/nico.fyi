/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useRef, useState } from 'react'
import ClientOnly from '../client-only'

function MyComponent() {
  // in production, don't use multiple states like this
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    let isCleandUp = false

    const abortController = new AbortController()
    abortControllerRef.current = abortController

    const fetchData = async () => {
      // reset the states
      setLoading(true)
      setError(null)
      setData(null)

      // @ts-ignore don't know why TS doesn't recognize any
      const combinedSignal = AbortSignal.any([
        abortController.signal,
        AbortSignal.timeout(1_000 * 5), // 5 seconds timeout
      ])
      const url = window.location.protocol + '//' + window.location.host
      const fetchURL = `${url}/experiments/fetch-abort-demo/api`
      try {
        const response = await fetch(fetchURL, {
          signal: combinedSignal,
        })
        const data = await response.json()

        if (!isCleandUp) {
          setData(data)
          setLoading(false)
          setError(null)
        }
      } catch (error: any) {
        if (!isCleandUp) {
          setLoading(false)

          if (error.name === 'TimeoutError') {
            setError('Timeout: It took more than 5 seconds to get the result!')
          }
          if (error.name === 'AbortError') {
            setError(`Fetch canceled by user`)
          }
        }
      }
    }

    fetchData()

    return () => {
      isCleandUp = true
      abortController.abort()
      abortControllerRef.current = null
    }
  }, [])

  return (
    <div>
      {data && !loading && !error ? <p>Data: {data.message}</p> : null}
      {error && !loading && !data ? <p>Error: {error}</p> : null}
      {loading ? (
        <button
          className="cursor-default rounded-md border border-black px-4 py-2"
          onClick={() => abortControllerRef.current?.abort()}
        >
          Loading. Will timeout in 5 seconds. Click to cancel now.
        </button>
      ) : null}
    </div>
  )
}

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Fetch abort demo</h1>
      <ClientOnly>
        <MyComponent />
      </ClientOnly>
    </div>
  )
}
