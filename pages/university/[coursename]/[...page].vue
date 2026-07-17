<template>
  <div v-html="fixed" />
</template>

<script setup>
const route = useRoute()
const coursename = route.params.coursename
const page = Array.isArray(route.params.page) ? route.params.page.join('/') : route.params.page

// Use $fetch with baseURL for SSR compatibility
const config = useRuntimeConfig()
const baseURL = import.meta.server ? config.public.siteUrl || 'https://everythinginperspective.vercel.app' : ''
const html = ref('')

try {
  html.value = await $fetch(`${baseURL}/courses/${coursename}/${page}.html`, { responseType: 'text' })
} catch (e) {
  console.error('Failed to fetch textbook page:', e)
}

// Rewrite relative URLs: remove .html and prefix with /university/{coursename}/
const fixed = computed(() => {
  if (!html.value) return ''
  
  return html.value
    // Remove meta refresh redirects
    .replace(/<meta[^>]*http-equiv=["']refresh["'][^>]*>/gi, '')
    // Remove .html from page links and prefix
    .replace(/href="([^":#/]+)\.html"/g, `href="/university/${coursename}/$1"`)
    // Prefix relative asset paths
    .replace(/href="(_static[^"]*)"/g, `href="/courses/${coursename}/$1"`)
    .replace(/src="(_static[^"]*)"/g, `src="/courses/${coursename}/$1"`)
    .replace(/src="(lunr[^"]*)"/g, `src="/courses/${coursename}/$1"`)
})

definePageMeta({
  layout: 'default'
})
</script>
