import { sql } from '@vercel/postgres'

const ACTIVE_STATUSES = ['active', 'trialing']

// True when the user has a Whop membership that grants access right now.
export async function hasActiveMembership(userId: string): Promise<boolean> {
  const { rows } = await sql`
    SELECT 1 FROM memberships
    WHERE user_id = ${userId} AND status = ANY(${ACTIVE_STATUSES}::text[])
    LIMIT 1`
  return rows.length > 0
}
