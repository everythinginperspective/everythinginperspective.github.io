<template>
  <main v-if="html" class="course-main">
    <div v-html="fixed" />
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const route = useRoute()
const config = useRuntimeConfig()
const html = ref('')
const error = ref(false)
const coursename = computed(() => route.params.coursename as string)

const fetchContent = async () => {
  const name = route.params.coursename as string
  const pageParam = route.params.page

  if (!name) {
    await navigateTo('/university', { redirectCode: 301 })
    return
  }
  const page = Array.isArray(pageParam) ? pageParam.join('/') : (pageParam || 'frontmatter')

  error.value = false
  html.value = ''

  try {
    const baseUrl = config.public.siteUrl || 'https://everythinginperspective.vercel.app'
    const response = await fetch(`${baseUrl}/university/${name}/${page}.html`)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    html.value = await response.text()
  } catch (e) {
    error.value = true
    // If file not found, try to redirect to frontmatter
    if (page !== 'frontmatter') {
      await navigateTo(`/university/${name}/frontmatter`, { redirectCode: 301 })
    }
  }
}

// Fetch on mount and when route changes
await fetchContent()
watch(() => route.fullPath, fetchContent)

// Extract body content to avoid nested HTML structure
const getBodyContent = (fullHtml: string): string => {
  const bodyMatch = fullHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i)
  return bodyMatch ? bodyMatch[1] : fullHtml
}

// Rewrite relative URLs to stay within course routes (remove .html extension)
const fixed = computed(() => {
  if (!html) return ''
  
  const bodyContent = getBodyContent(html)
  
  return bodyContent
    // Rewrite href links: remove .html and prefix with /university/{coursename}/
    .replace(/href="(?!https?|\/|#|data)([^"]+)\.html"/g, `href="/university/${coursename}/$1"`)
    // Rewrite src links (static assets): prefix with /university/{coursename}/
    .replace(/src="(?!https?|\/|data)([^"]+)"/g, `src="/university/${coursename}/$1"`)
})

// SEO
useSeoMeta({
  title: `${coursename} | Everything in Perspective University`,
  description: 'Interactive course content',
  ogTitle: coursename,
  ogType: 'website'
})
</script>

<style scoped>
.course-main {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* Textbook content styling */
:deep(.course-main) {
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

:deep(.course-main h1) {
  font-family: Georgia, Garamond, serif;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

:deep(.course-main h2) {
  font-family: Georgia, Garamond, serif;
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

:deep(.course-main p) {
  line-height: 1.7;
  margin-bottom: 1rem;
}

:deep(.course-main a) {
  color: var(--rainbow-blue);
  text-decoration: underline;
  transition: color 0.3s ease;
}

:deep(.course-main a:hover) {
  color: var(--rainbow-indigo);
}
</style>
