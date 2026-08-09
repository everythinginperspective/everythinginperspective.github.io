import { readdirSync, statSync } from 'fs'
import { join } from 'path'
import pluralize from 'pluralize'

const SITE_URL = 'https://everythinginperspective.vercel.app'

// Generate routes from content files
function generateRoutes() {
  const contentDir = join(process.cwd(), 'content')
  const routes = []
  
  try {
    const folders = readdirSync(contentDir)
      .filter(item => {
        const itemPath = join(contentDir, item)
        return statSync(itemPath).isDirectory()
      })
      .filter(folder => !folder.startsWith('.') && !folder.startsWith('_'))
    
    folders.forEach(folder => {
      const folderPath = join(contentDir, folder)
      const files = readdirSync(folderPath).filter(f => f.endsWith('.md'))
      
      // Special handling for mnemonics (use /mnemonics/[slug] route)
      if (folder === 'mnemonics') {
        routes.push('/mnemonics') // Index page
        files.forEach(file => {
          const slug = file.replace('.md', '')
          routes.push(`/mnemonics/${slug}`)
        })
      } else {
        // Magazine/linked-data routes for other collections
        const singular = pluralize.singular(folder)
        const plural = pluralize.plural(folder)
        
        files.forEach(file => {
          const slug = file.replace('.md', '')
          routes.push(`/magazine/${singular}/${slug}`)
          routes.push(`/linked-data/${folder}/${slug}`)
        })
        
        routes.push(`/magazine/${plural}`)
        routes.push(`/linked-data/${plural}`)
      }
    })
  } catch (e) {
    console.warn('Could not generate routes from content:', e.message)
  }
  
  return routes
}

export default defineNuxtConfig({
  // COMMENTED OUT: Disable prerender to avoid OOM on Vercel
  // nitro: {
  //   prerender: {
  //     crawlLinks: true,
  //     failOnError: false,
  //     routes: generateRoutes()
  //   }
  // },
  
  // Disable payload extraction
  experimental: {
    payloadExtraction: false
  },
  ssr: true,
  
  // Runtime config
  runtimeConfig: {
    public: {
      siteUrl: SITE_URL
    }
  },
  
  // Site URL for SEO and sitemap
  site: {
    url: SITE_URL,
    name: 'Everything in Perspective'
  },
  
  // Site config for @nuxtjs/seo
  siteConfig: {
    name: 'Everything in Perspective',
    url: SITE_URL,
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
    sitemap: `${SITE_URL}/sitemap.xml`
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
        // 1. Schema.org JSON-LD (render-blocking, SEO critical)
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Everything in Perspective',
            url: SITE_URL,
            logo: `${SITE_URL}/logo.png`,
            description: 'Essays on trends, context & nuance',
            sameAs: []
          })
        },
        // 2. Google Analytics (async)
        {
          async: true,
          src: 'https://www.googletagmanager.com/gtag/js?id=G-L1QCYE5G36'
        },
        // 3. Google Analytics config (defer)
        {
          defer: true,
          innerHTML: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-L1QCYE5G36');`
        },
        // 4. RichAds (async)
        {
          async: true,
          src: 'https://richinfo.co/richpartners/pops/js/richads-pu-ob.js',
          'data-pubid': '1013955',
          'data-siteid': '399567',
          'data-cfasync': 'false'
        },
        // 5. AdSense (async)
        {
          async: true,
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5562455580904451',
          crossOrigin: 'anonymous'
        },
        // 6. Mbidadm ads (defer)
        {
          defer: true,
          src: 'https://js.mbidadm.com/static/scripts.js',
          'data-admpid': '442242'
        },
        // 7. Clickhouse tracking (defer)
        {
          defer: true,
          src: '/clickhouse-tracker.js'
        },
        // 8. Litlyx library (defer)
        {
          defer: true,
          'data-workspace': '6a1eb34394b1fd622377befc',
          src: 'https://cdn.jsdelivr.net/npm/litlyx-js@latest/browser/litlyx.js'
        },
        // 9. Litlyx custom tracking (defer)
        {
          defer: true,
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
        // 10. aclib tracking (body, defer)
        {
          type: 'text/javascript',
          body: true,
          innerHTML: `aclib.runAutoTag({
            zoneId: 'txt61rv5pk',
          });`
        }
        // COMMENTED OUT:
        // Umami (performance optimization)
        // {
        //   defer: true,
        //   src: 'https://cloud.umami.is/script.js',
        //   'data-website-id': 'd28e1242-720a-46c7-8809-9845bc1f0c0c'
        // },
        // Plausible (performance optimization)
        // {
        //   async: true,
        //   src: 'https://plausible.io/js/pa-Yy-F8aaxiRk0-nCFyYuxJ.js'
        // },
        // Plausible init
        // {
        //   innerHTML: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`
        // }
      ]
    }
  },

  // Short URL aliases with 301 redirects
  routeRules: {
    '/mag/**': { redirect: { to: '/magazine/**', statusCode: 301 } },
    '/ld/**': { redirect: { to: '/linked-data/**', statusCode: 301 } }
  },
  
  // COMMENTED OUT: Disable prerender to avoid OOM on Vercel (was for GitHub Pages)
  // Prerender config: exclude wiki routes (served dynamically)
  // nitro: {
  //   prerender: {
  //     crawlLinks: true,
  //     failOnError: false,
  //     routes: generateRoutes(),
  //     ignore: ['/encyclopedia', '/dictionary']
  //   }
  // },

  // DevTools
  devtools: { enabled: false },

  // Vue config
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.startsWith('flat-')
    }
  }
})

// Export SITE_URL for use in pages/components
export { SITE_URL }
