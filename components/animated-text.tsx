'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'

// Custom hook to manage animation logic
const useAnimatedText = (text: string = '') => {
  const [animatedChars, setAnimatedChars] = useState<string[]>([])

  const middleIndex = useMemo(() => Math.floor(text.length / 2), [text])

  useEffect(() => {
    const chars = text.split('')
    setAnimatedChars(chars)
  }, [text])

  return { animatedChars, middleIndex }
}

interface AnimatedTextProps {
  text?: string
  className?: string
}

const CenteredAnimatedText = ({ text = '', className = '' }: AnimatedTextProps) => {
  const { animatedChars, middleIndex } = useAnimatedText(text)

  if (!text) {
    return null // Or return a placeholder if you prefer
  }

  return (
    <div className={`flex justify-center overflow-hidden ${className}`}>
      {animatedChars.map((char, index) => {
        const distance = Math.abs(index - middleIndex)
        const isLeft = index < middleIndex

        return (
          <motion.span
            key={`${char}-${index}`}
            initial={{
              opacity: 0,
              x: isLeft ? -50 : 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
              delay: distance * 0.1,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
            style={{ display: 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        )
      })}
    </div>
  )
}

export default CenteredAnimatedText
