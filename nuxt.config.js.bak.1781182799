export default defineNuxtConfig({
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false
    }
  },
  
  // Disable payload extraction
  experimental: {
    payloadExtraction: false
  },
  ssr: true,
  
  // Site URL for SEO and sitemap
  site: {
    url: 'https://everythinginperspective.github.io',
    name: 'Everything in Perspective'
  },
  
  // Site config for @nuxtjs/seo
  siteConfig: {
    name: 'Everything in Perspective',
    url: 'https://everythinginperspective.github.io',
    description: 'Essays on trends, context & nuance'
  },
  
  // Modules
  modules: ['@nuxt/content', '@nuxtjs/seo', '@nuxtjs/i18n'],
  
  // @nuxtjs/seo configuration (bundles: sitemap, robots, og-image, schema-org, seo-utils, link-checker)
  seo: {
    redirectToCanonicalSiteUrl: true,
    splash: false
  },
  
  // Robots configuration (via @nuxtjs/robots bundled in @nuxtjs/seo)
  robots: {
    allow: '/',
    disallow: ['/api/', '/admin/'],
    sitemap: 'https://everythinginperspective.github.io/sitemap.xml'
  },
  
  // nuxt-schema-org configuration  
  schemaOrg: {
    identity: 'Organization',
    minifyOptions: {
      keepFalseAttributes: false
    }
  },
  
  // i18n configuration
  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'fr', name: 'Français', file: 'fr.json' },
      { code: 'de', name: 'Deutsch', file: 'de.json' },
      { code: 'es', name: 'Español', file: 'es.json' },
      { code: 'it', name: 'Italiano', file: 'it.json' },
      { code: 'pt', name: 'Português', file: 'pt.json' },
      { code: 'nl', name: 'Nederlands', file: 'nl.json' },
      { code: 'zh', name: '中文', file: 'zh.json' },
      { code: 'ja', name: '日本語', file: 'ja.json' },
      { code: 'ar', name: 'العربية', file: 'ar.json' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: './locales/'
  },
  
  // Sitemap config
  sitemap: {
    enabled: true,
    sitemaps: false,
    xsl: false
  },

  // @nuxt/content v3 configuration
  content: {
    sources: {
      content: {
        driver: 'fs',
        base: './content'
      }
    },
    markdown: {
      anchorLinks: false,
      // Disable mdc to avoid mdream native binding issues during prerender
      // mdc: {
      //   highlight: {
      //     theme: 'github-light'
      //   }
      // }
    },
    // Supported file types: .md (markdown), .json, .yaml, .csv
    // CSV files are parsed into structured data
    extensions: ['.md', '.json', '.yaml', '.csv']
  },

  // CSS & styling
  css: [
    '~/themes/default.css',
    '~/assets/styles/global.css'
  ],

  // App config
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Everything in Perspective',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { name: 'description', content: 'Essays on trends, context & nuance' },
        { name: 'theme-color', content: '#000000' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'referrer', content: 'no-referrer-when-downgrade' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
          innerHTML: `async function trackCustomLitlyxPageVisit() {
            const ipData = await fetch('https://ipapi.co/json/').then(r => r.json());
            const date = new Date();
            const tzOffset = -date.getTimezoneOffset() / 60;
            window.Lit?.event('page_visit', {
              metadata: {
                ip: ipData.ip,
                continent: ipData.continent_name,
                country: ipData.country_name,
                referrer: document.referrer,
                user_agent: navigator.userAgent,
                date_iso: date.toISOString(),
                date_string: date.toString(),
                timezone_offset: tzOffset,
                current_url: location.href,
                current_host: location.host
              }
            });
          }
          if (!window.__litlyxTracked) {
            window.__litlyxTracked = true;
            trackCustomLitlyxPageVisit();
          }`
        },
        {
          async: true,
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5562455580904451',
          crossOrigin: 'anonymous'
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
    }
  },

  // Short URL aliases with 301 redirects
  routeRules: {
    '/mag/**': { redirect: { to: '/magazine/**', statusCode: 301 } },
    '/ld/**': { redirect: { to: '/linked-data/**', statusCode: 301 } }
  },

  // DevTools
  devtools: { enabled: false },

  // Vue config
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.startsWith('flat-')
    }
  }
})