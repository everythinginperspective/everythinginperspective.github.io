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
const coursename = route.params.coursename as string
const pageParam = route.params.page

if (!coursename) {
  await navigateTo('/university', { redirectCode: 301 })
}
const page = Array.isArray(pageParam) ? pageParam.join('/') : (pageParam || 'frontmatter')

// Fetch HTML from public/university/{coursename}/{page}.html
const { data: html, error } = await useFetch(`/university/${coursename}/${page}.html`, {
  timeout: 5000
})

// If fetch fails (404/error), redirect to course frontmatter
if (!html.value || error.value) {
  if (page !== 'frontmatter') {
    await navigateTo(`/university/${coursename}/frontmatter`, { redirectCode: 301 })
  }
}

// Rewrite relative URLs to stay within course routes (remove .html extension)
const fixed = computed(() => {
  if (!html.value) return ''
  
  return html.value
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
