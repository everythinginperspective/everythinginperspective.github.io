<template>
  <main class="dictionary-entry-main">
    <!-- Loading State -->
    <div v-if="pending" class="dictionary-loading">
      <p>Loading definition...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="dictionary-error">
      <h2>Word Not Found</h2>
      <p>{{ error }}</p>
      <a href="/dictionary" class="back-link">← Back to Dictionary</a>
    </div>

    <!-- Content -->
    <article v-else-if="entry" class="dictionary-entry">
      <!-- Wiktionary Content -->
      <div v-html="entry.body" class="wiktionary-content"></div>

      <!-- Attribution -->
      <WikiAttribution
        source-name="Wiktionary"
        :source-url="entry.url"
        :title="entry.word"
      />
    </article>
  </main>
</template>

<script setup lang="ts">
interface Entry {
  word: string
  body: string
  url: string
}

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const lang = (route.params.lang as string) || 'en'
const slug = decodeURIComponent(route.params.slug as string)

// Fetch Wiktionary HTML page
const { data: entry, pending, error } = await useFetch(
  () => `https://${lang}.wiktionary.org/wiki/${encodeURIComponent(slug)}`,
  {
    server: true,
    transform: async (html: string): Promise<Entry> => {
      const { load } = await import('cheerio')
      const $ = load(html)
      
      const body = $('div.mw-parser-output').html() || ''
      
      return {
        word: slug,
        body,
        url: `https://${lang}.wiktionary.org/wiki/${encodeURIComponent(slug)}`
      }
    },
    onResponseError() {
      return {
        word: slug,
        body: '',
        url: `https://${lang}.wiktionary.org/wiki/${encodeURIComponent(slug)}`
      }
    }
  }
)

// SEO
watch(() => entry.value, (newEntry) => {
  if (newEntry) {
    useSeoMeta({
      title: `${newEntry.word} | Dictionary`,
      description: `Definition of ${newEntry.word} from Wiktionary`,
      ogTitle: newEntry.word,
      ogDescription: `Definition of ${newEntry.word}`,
      ogType: 'website'
    })

    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Thing',
            name: newEntry.word,
            url: newEntry.url,
            isPartOf: {
              '@type': 'WebSite',
              name: 'Everything in Perspective',
              url: 'https://everythinginperspective.vercel.app'
            },
            isBasedOn: {
              '@type': 'Thing',
              url: newEntry.url
            },
            license: 'https://creativecommons.org/licenses/by-sa/4.0/'
          })
        }
      ]
    })
  }
}, { immediate: true })
</script>

<style scoped>
.dictionary-entry-main {
  max-width: 56rem;
  margin: 0 auto;
  padding: 3rem 1rem;
}

.dictionary-loading,
.dictionary-error {
  text-align: center;
  padding: 3rem 1rem;
  color: #666666;
}

.dictionary-error h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  color: #0066cc;
  text-decoration: none;
  font-weight: 600;
}

.back-link:hover {
  text-decoration: underline;
}

.dictionary-entry {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.entry-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #0066cc;
}

.entry-word {
  font-family: Georgia, Garamond, serif;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  line-height: 1.3;
}

.entry-pronunciation {
  color: #666666;
  font-size: 1rem;
  margin: 0;
}

.pos-section {
  margin: 2.5rem 0;
}

.pos-heading {
  font-family: Georgia, Garamond, serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin: 1.5rem 0 1rem 0;
  padding: 0.5rem 0;
  border-left: 4px solid #0066cc;
  padding-left: 0.75rem;
}

.definitions-list {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.definition-item {
  margin-bottom: 1rem;
  line-height: 1.8;
}

.definition-text {
  margin: 0;
  color: #333;
  font-size: 1rem;
}

.examples-section {
  margin: 1.5rem 0 0 0;
  padding: 1rem;
  background-color: #f9f9f9;
  border-left: 4px solid #ddd;
  border-radius: 4px;
}

.examples-heading {
  font-weight: 700;
  font-size: 0.95rem;
  margin: 0 0 0.75rem 0;
  color: #666;
}

.examples-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.example-item {
  margin-bottom: 0.5rem;
  padding: 0.5rem 0;
  color: #555;
  font-size: 0.95rem;
  font-style: italic;
  border-bottom: 1px solid #eee;
}

.example-item:last-child {
  border-bottom: none;
}

.no-definitions {
  text-align: center;
  padding: 2rem;
  background-color: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 4px;
  margin: 2rem 0;
}

.no-definitions a {
  color: #0066cc;
  text-decoration: none;
  font-weight: 600;
}

.no-definitions a:hover {
  text-decoration: underline;
}

.entry-read-more {
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: #f0f7ff;
  border-radius: 4px;
}

.read-more-link {
  color: #0066cc;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.05rem;
}

.read-more-link:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .dictionary-entry-main {
    padding: 2rem 1rem;
  }

  .entry-word {
    font-size: 1.75rem;
  }

  .pos-heading {
    font-size: 1.25rem;
  }
}
</style>
