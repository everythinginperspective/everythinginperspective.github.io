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
  },
  meta: [
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'referrer', content: 'no-referrer-when-downgrade' }
  ],
  script: [
    {
      async: true,
      src: 'https://js.mbidadm.com/static/scripts.js',
      'data-admpid': '442242'
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Everything in Perspective',
        url: 'https://humanitiesclinic.github.io',
        logo: 'https://humanitiesclinic.github.io/logo.png',
        description: 'Essays on trends, context & nuance',
        sameAs: []
      })
    }
  ]
})
</script>
