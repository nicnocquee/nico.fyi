'use client'

import { useSyncExternalStore } from 'react'
import { getTime } from './utils'

export default function Footer() {
  const date = useSyncExternalStore(
    () => () => {},
    () => getTime(),
    () => ''
  )
  return (
    <div className="grid min-h-80 w-full grid-cols-4 gap-4 bg-slate-400 font-normal">
      <div>
        <h1 className="text-xl font-bold">Footer</h1>
        <p>{date}</p>
        <p>
          We have to intentionally add random links so that the whole page size is not too small.
          When it's small, the streaming of data doesn't work in Safari.
        </p>
      </div>

      <div className="flex flex-col space-y-4">
        {Array.from([...Array(20)]).map((_, i) => (
          <a key={`https://www.google.com/${i}`} href={`https://www.google.com/${i}`}>
            {`https://www.google.com/${i}`}
          </a>
        ))}
      </div>

      <div className="flex flex-col space-y-4">
        {Array.from([...Array(20)]).map((_, i) => (
          <a key={`https://www.google.com/${i}`} href={`https://www.google.com/${i}`}>
            {`https://www.google.com/${i}`}
          </a>
        ))}
      </div>

      <div className="flex flex-col space-y-4">
        {Array.from([...Array(20)]).map((_, i) => (
          <a key={`https://www.google.com/${i}`} href={`https://www.google.com/${i}`}>
            {`https://www.google.com/${i}`}
          </a>
        ))}
      </div>
    </div>
  )
}
