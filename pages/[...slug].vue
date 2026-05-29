<template>
  <div></div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const router = useRouter()

// Redirect all unmatched routes to /magazine/articles/
navigateTo('/magazine/articles/', { redirectCode: 301 })
</script>
