'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { useValueAsyncEffect } from '../value-hook'
import TimeComponent from '../time'
import Image from 'next/image'

const TheComponent = () => {
  const [value, setValue] = useValueAsyncEffect<ReactNode | null>(null)

  return (
    <div>
      <button
        onClick={() => {
          setValue(async function* () {
            yield <p className="text-sm text-gray-500">Pretending to do some work ...</p>
            await new Promise<void>((resolve) => {
              setTimeout(() => resolve(), 3000)
            })
            yield (
              <div>
                <p className="font-extrabold text-green-600">Done!</p>
                <TimeComponent />
              </div>
            )
          })
        }}
      >
        Start
      </button>
      <div>{value}</div>
    </div>
  )
}

export const TheComponent2 = () => {
  const [value, setValue] = useValueAsyncEffect<ReactNode[]>([])

  return (
    <div>
      <button
        onClick={() => {
          setValue(async function* () {
            const one = (
              <p key="1" className="text-sm text-gray-500">
                Pretending to do some work ...
              </p>
            )
            yield [one]
            await new Promise<void>((resolve) => {
              setTimeout(() => resolve(), 3000)
            })
            const two = (
              <div key="2">
                <p className="font-extrabold text-green-600">Done!</p>
                <TimeComponent />
              </div>
            )
            yield [one, two]
          })
        }}
      >
        Start
      </button>
      <div>{value}</div>
    </div>
  )
}

export const MovieResult = () => {
  const cancel = useRef<AbortController | null>(null)
  const [state, setState] = useState<'idle' | 'loading' | 'cancelling'>('idle')
  const [value, setValue] = useValueAsyncEffect<{
    components: ReactNode[] | null
    status: 'done' | 'cancelled' | 'pending'
  } | null>(null)

  useEffect(() => {
    // Set state to 'idle' when the operation is cancelled or done
    if (
      (cancel.current?.signal.aborted && value?.status === 'cancelled') ||
      value?.status === 'done'
    ) {
      setState('idle')
    }
  }, [value])

  const handleClick = () => {
    if (state === 'loading') {
      cancel.current?.abort()
      setState('cancelling')
      return
    }
    setState('loading')
    cancel.current = new AbortController()
    setValue(async function* () {
      const loading = (
        <p key="1" className="text-sm text-gray-500">
          Faking fetching movies ...
        </p>
      )
      yield { components: [loading], status: 'pending' }

      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 3000)
      })

      if (cancel.current?.signal.aborted) {
        yield { components: null, status: 'cancelled' }
        return
      }

      const movie = <Movie key="2" />
      yield { components: [movie], status: 'pending' }

      const loadingCasts = (
        <p key="3" className="text-sm text-gray-500">
          Faking fetching the movie casts ...
        </p>
      )

      yield { components: [movie, loadingCasts], status: 'pending' }

      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 3000)
      })

      if (cancel.current?.signal.aborted) {
        yield { components: null, status: 'cancelled' }
        return
      }

      const characters = <MovieCasts key="4" />
      yield { components: [movie, characters], status: 'done' }
    })
  }

  return (
    <div>
      <button className="rounded-md bg-green-400 px-4 py-2 text-white" onClick={handleClick}>
        {state === 'loading' ? 'Cancel' : state === 'idle' ? 'Get the movie' : 'Cancelling...'}
      </button>
      {value?.components ? <div className="space-y-4 py-4">{value?.components}</div> : null}
    </div>
  )
}

const Movie = () => {
  return (
    <div className="flex flex-col space-y-2">
      <Image
        alt="The Fall of The House of Usher"
        src={`/static/images/experiments/fall-house-of-usher.png.webp`}
        width={60}
        height={120}
        style={{ objectFit: 'contain' }}
      />
      <h2 className="text-3xl font-extrabold">The Fall of the House of Usher</h2>
      <p>
        Siblings Roderick and Madeline Usher have built a pharmaceutical company into an empire of
        wealth, privilege and power; however, secrets come to light when the heirs to the Usher
        dynasty start dying.
      </p>
    </div>
  )
}

const MovieCasts = () => {
  return (
    <div className="flex flex-row space-x-2">
      {[
        {
          image: `/static/images/experiments/usher-1.png`,
          name: `Bruce Greendwood`,
          character: 'Roderick Usher',
        },
        {
          image: `/static/images/experiments/usher-2.png`,
          name: `Willa Fitzgerald`,
          character: 'Young Madeline',
        },
        {
          image: `/static/images/experiments/usher-3.png`,
          name: `Carla Gugino`,
          character: 'Verna',
        },
        {
          image: `/static/images/experiments/usher-4.png`,
          name: `Kate Siegel`,
          character: 'Camille L',
        },
      ].map(({ image, name, character }, i) => {
        return (
          <div key={i} className="border border-gray-200 p-2">
            <Image
              alt={name}
              src={image}
              width={60}
              height={120}
              style={{ objectFit: 'contain' }}
            />
            <p className="font-normal">{name}</p>
            <p className="font-light">{character}</p>
          </div>
        )
      })}
    </div>
  )
}

export const Counter = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <button
        className="rounded-lg bg-gray-700 px-4 py-2 text-white"
        onClick={() => setCount((curr) => curr + 1)}
      >
        Increment ({count})
      </button>
    </div>
  )
}

export default TheComponent
