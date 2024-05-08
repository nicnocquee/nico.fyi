export const runtime = 'edge'
import { createClient } from '@libsql/client'
import { z } from 'zod'

export async function GET(request: Request) {
  const tursoDbUrl = process.env.TURSO_DB_URL
  const tursoDbAuthToken = process.env.TURSO_DB_AUTH_TOKEN

  if (!tursoDbUrl || !tursoDbAuthToken) {
    return new Response('Missing Turso DB URL or auth token', {
      status: 500,
    })
  }

  const url = new URL(request.url)
  const answers = url.searchParams.get('answers')
  const parsed = await z.string().parseAsync(answers)

  const client = createClient({
    url: tursoDbUrl,
    authToken: tursoDbAuthToken,
  })

  const response = await client.execute({
    sql: `SELECT count FROM responses WHERE answers = ?`,
    args: [parsed],
  })

  for (const row of response.rows) {
    return new Response(JSON.stringify(row), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return new Response('Not found', {
    status: 404,
  })
}

export async function POST(request: Request) {
  const tursoDbUrl = process.env.TURSO_DB_URL
  const tursoDbAuthToken = process.env.TURSO_DB_AUTH_TOKEN

  if (!tursoDbUrl || !tursoDbAuthToken) {
    return new Response('Missing Turso DB URL or auth token', {
      status: 500,
    })
  }

  const body = await request.json()
  const schema = z.object({
    answers: z.string(),
    recaptchaToken: z.string(),
  })
  const { answers, recaptchaToken } = await schema.parseAsync(body)

  if (!recaptchaToken) {
    return new Response('Missing recaptcha token', {
      status: 400,
    })
  }

  // @ts-expect-error
  const ip = request.ip || request.headers.get('X-Forwarded-For')

  const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}&remoteip=${ip}`,
  })

  const data = await recaptchaResponse.json()

  if (!data.success) {
    return new Response('Invalid recaptcha token', {
      status: 400,
    })
  }

  const client = createClient({
    url: tursoDbUrl,
    authToken: tursoDbAuthToken,
  })

  await client.execute(
    `CREATE TABLE IF NOT EXISTS responses (id serial primary key, answers text unique, count int, selectedPaths text)`
  )

  const response = await client.execute({
    sql: `INSERT INTO responses (answers, count)
    VALUES (?, 1)
    ON CONFLICT(answers) DO UPDATE SET count = count + 1;
    `,
    args: [answers],
  })

  return new Response(JSON.stringify(response), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
