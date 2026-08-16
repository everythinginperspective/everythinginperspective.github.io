<template>
  <main>
    <h1>Test Fetch</h1>
    <div>{{ data }}</div>
  </main>
</template>

<script setup>
const { data } = await useAsyncData('testUniversity', async () => {
  try {
    const res = await fetch('/university/course-AIuniverse/frontmatter.html')
    return await res.text()
  } catch (e) {
    return `Error: ${e.message}`
  }
})
</script>
