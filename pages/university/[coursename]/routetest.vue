<template>
  <main>
    <h1>Route Debug</h1>
    <pre>{{ JSON.stringify(route, null, 2) }}</pre>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const route = useRoute()
</script>
