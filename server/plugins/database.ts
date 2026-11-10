import { sql } from '@vercel/postgres'

// Creates tables on cold start. Failures are logged so public pages still render without a database.
export default defineNitroPlugin(async () => {
  try {
    await sql`CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      whop_user_id TEXT UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`
    await sql`CREATE TABLE IF NOT EXISTS memberships (
      id TEXT PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      whop_user_id TEXT,
      status TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`
  } catch (error) {
    console.error('Database setup failed:', error)
  }
})
