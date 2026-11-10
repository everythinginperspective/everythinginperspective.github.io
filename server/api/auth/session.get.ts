export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user) return { user: null, subscribed: false }

  const subscribed = await hasActiveMembership(session.user.id)
  return { user: session.user, subscribed }
})
