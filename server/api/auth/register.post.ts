import { sql } from '@vercel/postgres'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string, password?: string }>(event)
  const email = body?.email?.trim().toLowerCase() ?? ''
  const password = body?.password ?? ''

  if (!email.includes('@') || password.length < 8) {
    throw createError({ statusCode: 400, statusMessage: 'Enter a valid email and a password of at least 8 characters' })
  }

  const existing = await sql`SELECT id FROM users WHERE email = ${email}`
  if (existing.rows.length > 0) {
    throw createError({ statusCode: 409, statusMessage: 'Email already registered' })
  }

  const passwordHash = await hashPassword(password)
  const { rows } = await sql`
    INSERT INTO users (email, password_hash)
    VALUES (${email}, ${passwordHash})
    RETURNING id, email`
  const user = rows[0]

  await setUserSession(event, { user: { id: user.id, email: user.email } })
  return { ok: true }
})
