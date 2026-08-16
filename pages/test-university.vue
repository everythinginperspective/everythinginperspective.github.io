<template>
  <main>
    <h1>Test Fetch</h1>
    <div>{{ data }}</div>
  </main>
</template>

<script setup>
const config = useRuntimeConfig()
const baseUrl = config.public.siteUrl || 'https://everythinginperspective.vercel.app'

const { data } = await useAsyncData('testUniversity', async () => {
  try {
    const url = `${baseUrl}/university/course-AIuniverse/frontmatter.html`
    const res = await fetch(url)
    return await res.text()
  } catch (e) {
    return `Error: ${e.message}`
  }
})
</script>
