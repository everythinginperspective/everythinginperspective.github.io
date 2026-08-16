export default defineRouteMiddleware(async (to, from) => {
  // Only apply to university course routes
  if (!to.path.startsWith('/university/')) return

  const coursename = to.params.coursename as string
  const pageParam = to.params.page
  const page = Array.isArray(pageParam) ? pageParam.join('/') : (pageParam || 'frontmatter')

  // Skip redirect for frontmatter (always valid)
  if (page === 'frontmatter') return

  // Check if page exists by fetching it
  try {
    const baseUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://everythinginperspective.vercel.app'
    const response = await fetch(`${baseUrl}/university/${coursename}/${page}.html`, { method: 'HEAD' })
    
    if (!response.ok) {
      // Page not found, redirect to frontmatter
      return navigateTo(`/university/${coursename}/frontmatter`, { redirectCode: 301 })
    }
  } catch (e) {
    // On error, allow navigation to proceed (component will handle)
  }
})
