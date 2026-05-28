// Generate prerender routes from content
const { readdirSync, statSync } = require('fs')
const { join } = require('path')
const contentDir = join(process.cwd(), 'content')

const preloadRoutes = () => {
  const routes = ['/']
  try {
    const folders = readdirSync(contentDir)
      .filter(item => {
        const itemPath = join(contentDir, item)
        return statSync(itemPath).isDirectory() && !item.startsWith('.')
      })
    
    for (const folder of folders) {
      const folderPath = join(contentDir, folder)
      // Add collection index routes for all content types
      routes.push(`/magazine/${folder}`)
      routes.push(`/linked-data/${folder}`)
      
      try {
        const files = readdirSync(folderPath).filter(f => f.endsWith('.md'))
        for (const file of files) {
          const slug = file.replace(/\.md$/, '')
          routes.push(`/linked-data/${folder}/${slug}`)
          const singular = folder.replace(/s$/, '')
          routes.push(`/magazine/${singular}/${slug}`)
        }
      } catch (e) {
        // skip
      }
    }
  } catch (e) {
    console.warn('Could not read content directories')
  }
  return routes
}

export default defineNuxtConfig({
  // Build output to .dist for Surge deployment
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
      ignore: ['/api/**'],
      routes: preloadRoutes()
    },
    routeRules: {
      '/api/**': { cache: false, swr: false }
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
    sitemaps: false
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

  // Generate static site at build time
  routeRules: {
    '/': { prerender: true },
    // Short URL aliases with 301 redirects
    '/mag/**': { redirect: { to: '/magazine/**', statusCode: 301 }, prerender: true },
    '/ld/**': { redirect: { to: '/linked-data/**', statusCode: 301 }, prerender: true },
    // Legacy routes (keeping for backwards compatibility)
    '/article/**': { prerender: true },
    '/perspective/**': { prerender: true },
    '/page/**': { prerender: true },
    '/book/**': { prerender: true },
    // New dynamic magazine routes
    '/magazine/**': { prerender: true },
    // Linked data routes
    '/linked-data/**': { prerender: true },
    // API routes - no cache
    '/api/**': { cache: false }
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