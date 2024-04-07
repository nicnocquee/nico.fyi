export const runtime = 'edge'
import { createClient } from '@libsql/client/web'
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
  })
  const { answers } = await schema.parseAsync(body)

  const client = createClient({
    url: tursoDbUrl,
    authToken: tursoDbAuthToken,
  })

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
