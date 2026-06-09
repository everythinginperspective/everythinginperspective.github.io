export default defineNuxtConfig({
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: true
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
      meta: [
        { name: 'description', content: 'Essays on trends, context & nuance' },
        { name: 'theme-color', content: '#000000' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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