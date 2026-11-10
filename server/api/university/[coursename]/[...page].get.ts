export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user) {
    throw createError({ statusCode: 401, statusMessage: 'Log in to read lessons' })
  }
  if (!(await hasActiveMembership(session.user.id))) {
    throw createError({ statusCode: 402, statusMessage: 'Subscription required' })
  }

  const coursename = getRouterParam(event, 'coursename') ?? ''
  const page = getRouterParam(event, 'page') || 'frontmatter'

  // Allow only simple course and page names, so no path traversal is possible
  const pageParts = page.split('/')
  const valid = /^course-[\w-]+$/.test(coursename)
    && pageParts.every(part => /^[\w-]+$/.test(part))
  if (!valid) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid lesson path' })
  }

  const siteUrl = useRuntimeConfig().public.siteUrl
  const res = await fetch(`${siteUrl}/university/${coursename}/${page}.html`)
  if (!res.ok) {
    throw createError({ statusCode: res.status === 404 ? 404 : 502, statusMessage: 'Lesson not found' })
  }

  setHeader(event, 'content-type', 'text/html; charset=utf-8')
  setHeader(event, 'cache-control', 'private, no-store')
  return await res.text()
})
