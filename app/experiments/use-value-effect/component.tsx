'use client'

import { ReactNode } from 'react'
import { useValueAsyncEffect } from '../value-hook'
import TimeComponent from '../time'

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

export default TheComponent
