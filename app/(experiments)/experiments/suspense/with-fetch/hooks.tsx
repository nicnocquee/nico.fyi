import { useState, useRef, useEffect, useMemo } from 'react'

// We use discriminated union to represent the result of the fetch.
// The data will have value if the loading is false and no error.
// The data will be null if the loading is true or the error is not null.
type FetchResult<T> =
  | {
      data: T
      loading: false
      error: null
      abortController: AbortController | null
    }
  | {
      data: null
      loading: true
      error: null
      abortController: AbortController | null
    }
  | {
      data: null
      loading: false
      error: Error
      abortController: AbortController | null
    }

export const useFetch = <T,>(pathname: string, timeout: number = 20): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    let isCleanedUp = false // this is the indicator to indicate whether the effect is cleaned up

    const abortController = new AbortController()
    abortControllerRef.current = abortController

    const fetchData = async () => {
      // reset the states
      setLoading(true)
      setError(null)
      setData(null)

      const url = window.location.protocol + '//' + window.location.host
      const fetchURL = `${url}${pathname}`
      try {
        // @ts-ignore don't know why TS doesn't recognize AbortSignal.any
        const combinedSignal = AbortSignal.any([
          abortController.signal,
          AbortSignal.timeout(1_000 * timeout), // Abort signal to cancel the request after {timeout} seconds
        ])
        const response = await fetch(fetchURL, {
          signal: combinedSignal,
        })
        const data = await response.json()

        if (!isCleanedUp) {
          // only update the states when the effect is not cleaned up
          setData(data)
          setLoading(false)
          setError(null)
        }
      } catch (err: unknown) {
        if (!isCleanedUp) {
          setLoading(false)
          const error = err as Error
          if (error.name === 'TimeoutError') {
            setError(new Error(`Timeout: It took more than ${timeout} seconds to get the result!`))
          }
          if (error.name === 'AbortError') {
            setError(new Error(`Fetch canceled by user`))
          }
          setError(error)
        }
      }
    }

    fetchData()

    return () => {
      // clean up the effect when the component is unmounted
      isCleanedUp = true
      abortController.abort()
      abortControllerRef.current = null
    }
  }, [pathname, timeout])

  // Construct the result object based on the final states
  const result = useMemo<FetchResult<T>>(() => {
    if (loading) {
      return { data: null, loading: true, error: null, abortController: abortControllerRef.current }
    } else if (error) {
      return { data: null, loading: false, error, abortController: abortControllerRef.current }
    } else {
      return {
        data: data as T,
        loading: false,
        error: null,
        abortController: abortControllerRef.current,
      }
    }
  }, [data, loading, error])

  return result
}
