'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

type GeneratorYield<T> = Generator<T, void, unknown>
type UseValueEffectReturnType<T> = [T, (fn: () => GeneratorYield<T>) => void]

export function useValueEffect<T>(defaultValue: T): UseValueEffectReturnType<T> {
  const [value, setValue] = useState<T>(defaultValue)
  const effect = useRef<GeneratorYield<T> | null>(null)

  const nextRef = useRef<() => void>(() => {})

  nextRef.current = () => {
    if (!effect.current) return
    const newValue = effect.current.next()

    if (newValue.done) {
      effect.current = null
      return
    }

    if (value === newValue.value) {
      nextRef.current?.()
    } else {
      setValue(newValue.value)
    }
  }

  useEffect(() => {
    if (effect.current) {
      nextRef.current?.()
    }
  })

  const queue = useCallback((fn: () => GeneratorYield<T>) => {
    effect.current = fn()
    nextRef.current?.()
  }, [])

  return [value, queue]
}

// Update the type to reflect async generator functions
type AsyncGeneratorYield<T> = AsyncGenerator<T, void, unknown>
type UseValueAsyncEffectReturnType<T> = [T, (fn: () => AsyncGeneratorYield<T>) => void]

export function useValueAsyncEffect<T>(defaultValue: T): UseValueAsyncEffectReturnType<T> {
  const [value, setValue] = useState<T>(defaultValue)
  const effect = useRef<AsyncGeneratorYield<T> | null>(null)

  const nextRef = useRef<() => Promise<void>>(async () => {})

  nextRef.current = async () => {
    if (!effect.current) return
    const newValue = await effect.current.next() // Await the next value from the async generator

    if (newValue.done) {
      effect.current = null
      return
    }

    if (value !== newValue.value) {
      setValue(newValue.value)
    } else {
      // Immediately try to get the next value if the current value hasn't changed
      await nextRef.current()
    }
  }

  useEffect(() => {
    // Execute the nextRef function if there is an effect to process
    if (effect.current) {
      nextRef.current()
    }
  })

  const queue = useCallback(
    (fn: () => AsyncGeneratorYield<T>) => {
      effect.current = fn()
      nextRef.current()
    },
    [effect, nextRef]
  )

  return [value, queue]
}
