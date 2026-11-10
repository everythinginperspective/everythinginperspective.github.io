import { sql } from '@vercel/postgres'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string, password?: string }>(event)
  const email = body?.email?.trim().toLowerCase() ?? ''
  const password = body?.password ?? ''

  const { rows } = await sql`SELECT id, email, password_hash FROM users WHERE email = ${email}`
  const user = rows[0]

  // Same message for unknown email and wrong password
  const valid = user ? await verifyPassword(user.password_hash, password) : false
  if (!user || !valid) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
  }

  await setUserSession(event, { user: { id: user.id, email: user.email } })
  return { ok: true }
})
