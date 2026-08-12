<template>
  <div>
    <Header />
    <Breadcrumbs />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/Header.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import Footer from '~/components/Footer.vue'

// SEO setup
useHead({
  htmlAttrs: {
    lang: 'en'
  }
})
</script>
