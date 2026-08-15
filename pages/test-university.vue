<template>
  <main>
    <h1>Test Fetch</h1>
    <div>{{ content }}</div>
  </main>
</template>

<script setup>
const content = ref('Loading...')

onMounted(async () => {
  try {
    const res = await fetch('/university/course-AIuniverse/frontmatter.html')
    content.value = await res.text()
  } catch (e) {
    content.value = `Error: ${e.message}`
  }
})
</script>
