import { createHmac, timingSafeEqual } from 'node:crypto'
import { sql } from '@vercel/postgres'

const TOLERANCE_SECONDS = 300
const HANDLED_EVENTS = ['membership.activated', 'membership.deactivated', 'membership.updated']

// Standard Webhooks signature: HMAC-SHA256 over "{id}.{timestamp}.{body}", sent as "v1,<base64>".
function verifySignature(rawBody: string, headers: Record<string, string | undefined>, secret: string): boolean {
  const id = headers['webhook-id']
  const timestamp = headers['webhook-timestamp']
  const signatureHeader = headers['webhook-signature']
  if (!id || !timestamp || !signatureHeader || !secret) return false

  const age = Math.abs(Date.now() / 1000 - Number(timestamp))
  if (!Number.isFinite(age) || age > TOLERANCE_SECONDS) return false

  const expected = Buffer.from(
    createHmac('sha256', secret).update(`${id}.${timestamp}.${rawBody}`).digest('base64')
  )

  return signatureHeader.split(' ').some((part) => {
    const [version, signature] = part.split(',')
    if (version !== 'v1' || !signature) return false
    const candidate = Buffer.from(signature)
    return candidate.length === expected.length && timingSafeEqual(candidate, expected)
  })
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const rawBody = await readRawBody(event, 'utf8')
  if (!rawBody) throw createError({ statusCode: 400, statusMessage: 'Empty body' })

  if (!verifySignature(rawBody, getRequestHeaders(event), config.whopWebhookSecret)) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid signature' })
  }

  const payload = JSON.parse(rawBody) as { type: string, data: any }
  if (!HANDLED_EVENTS.includes(payload.type)) return { received: true }

  const membership = payload.data
  const userId = membership?.metadata?.customer_id
  if (!membership?.id || !userId) return { received: true, skipped: 'no customer_id' }

  const status = payload.type === 'membership.deactivated'
    ? 'deactivated'
    : (membership.status ?? 'active')

  // Upsert keeps repeated deliveries safe.
  await sql`
    INSERT INTO memberships (id, user_id, whop_user_id, status, updated_at)
    VALUES (${membership.id}, ${userId}, ${membership.user_id ?? null}, ${status}, now())
    ON CONFLICT (id) DO UPDATE SET
      status = EXCLUDED.status,
      whop_user_id = EXCLUDED.whop_user_id,
      updated_at = now()`

  return { received: true }
})
