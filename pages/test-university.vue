<template>
  <main class="test-main">
    <h1>University Course Test Page</h1>
    <p>Test links:</p>
    <ul>
      <li><a href="/university/course-AIuniverse/frontmatter">AI Universe - Frontmatter</a></li>
      <li><a href="/university/course-engineering-through-making/frontmatter">Engineering - Frontmatter</a></li>
      <li><a href="/university/course-quantum-theories/frontmatter">Quantum - Frontmatter</a></li>
    </ul>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

useSeoMeta({
  title: 'University Course Test | Everything in Perspective',
  description: 'Test page for university course rendering',
})
</script>

<style scoped>
.test-main {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

ul {
  list-style: disc;
  margin-left: 2rem;
}

li {
  margin-bottom: 1rem;
}

a {
  color: var(--rainbow-blue);
  text-decoration: underline;
}

a:hover {
  color: var(--rainbow-indigo);
}
</style>
