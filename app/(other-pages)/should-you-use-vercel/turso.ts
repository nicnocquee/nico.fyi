import 'server-only'

import { createClient } from '@libsql/client'

const tursoDbUrl = process.env.TURSO_DB_URL
const tursoDbAuthToken = process.env.TURSO_DB_AUTH_TOKEN

export const turso = createClient({
  url: tursoDbUrl!,
  authToken: tursoDbAuthToken,
})
