import { HttpResponse, http } from 'msw'
import { expect, test } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from './route'
import { server } from '@/__tests__/setup'

export const recaptchaHandler = (recaptchaToken: string) => [
  http.post('https://www.google.com/recaptcha/api/siteverify', () => {
    console.log('recaptchaHandler')
    return HttpResponse.json({ success: recaptchaToken === 'abcd' })
  }),
]

test('POST in /should-you-use-vercel/api/ should throw when body is empty', async () => {
  server.use(...recaptchaHandler(''))

  const req = new NextRequest('http://localhost', { method: 'POST' })

  await expect(() => POST(req)).rejects.toThrow()
})

test('POST in /should-you-use-vercel/api/ should throw when recaptcha token is missing', async () => {
  server.use(...recaptchaHandler(''))

  const req = new NextRequest('http://localhost', {
    method: 'POST',
    body: JSON.stringify({ answers: 'a' }),
  })

  await expect(() => POST(req)).rejects.toThrow()
})

test('POST in /should-you-use-vercel/api/ should return 400 when recaptcha token is invalid', async () => {
  server.use(...recaptchaHandler('a'))

  const req = new NextRequest('http://localhost', {
    method: 'POST',
    body: JSON.stringify({ answers: 'a', recaptchaToken: 'a' }),
  })

  const res = await POST(req)

  expect(res.status).toBe(400)
})

test('POST in /should-you-use-vercel/api/ should return 200 when recaptcha token is valid', async () => {
  server.use(...recaptchaHandler('abcd'))

  const req = new NextRequest('http://localhost', {
    method: 'POST',
    body: JSON.stringify({ answers: 'a', recaptchaToken: 'abcd' }),
  })

  const res = await POST(req)

  expect(res.status).toBe(200)
})
