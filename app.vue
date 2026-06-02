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
      src: 'https://www.googletagmanager.com/gtag/js?id=G-L1QCYE5G36'
    },
    {
      innerHTML: `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-L1QCYE5G36');`
    },
    {
      async: true,
      src: 'https://js.mbidadm.com/static/scripts.js',
      'data-admpid': '442242'
    },
    {
      defer: true,
      src: 'https://cloud.umami.is/script.js',
      'data-website-id': 'd28e1242-720a-46c7-8809-9845bc1f0c0c'
    },
    {
      defer: true,
      'data-workspace': '6a1eb34394b1fd622377befc',
      src: 'https://cdn.jsdelivr.net/npm/litlyx-js@latest/browser/litlyx.js'
    },
    {
      async: true,
      src: 'https://plausible.io/js/pa-Yy-F8aaxiRk0-nCFyYuxJ.js'
    },
    {
      innerHTML: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`
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
