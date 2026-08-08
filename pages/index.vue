<template>
  <div>
    <h1>TEST PAGE - VERCEL REBUILD CHECK</h1>
    <p>If you see this, the rebuild worked.</p>
    <p>Timestamp: {{ new Date().toISOString() }}</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>
