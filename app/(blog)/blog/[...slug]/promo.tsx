'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useEffect } from 'react'

const messages = [
  '👋 Hey, did you get a chance to see my latest book?',
  'Have you had a look at my new book yet? 👀',
  '🫡 Hello friend, have you taken a peek at my newest book?',
  '🧐 Did you see my new book?',
  '🥸 Btw, have you explored my latest book?',
  'Have you had a chance to glance at my recent book? 🙏',
  'Did my new book catch your eye? 😎',
]

export const Promo = () => {
  useEffect(() => {
    toast({
      title: 'Pull Request Best Practices',
      description: messages[Math.floor(Math.random() * messages.length)],
      duration: 10000,
      action: (
        <Button variant={'outline'} asChild>
          <a target="_blank" href="https://pr.nico.fyi">
            Visit
          </a>
        </Button>
      ),
    })
  }, [])
  return <div />
}
