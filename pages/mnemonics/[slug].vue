<template>
  <main v-if="mnemonic">
    <!-- Article Header -->
    <article class="mnemonic-article">
      <header class="article-header">
        <div class="article-meta">
          <span v-if="mnemonic.category" class="badge">{{ mnemonic.category }}</span>
        </div>
        <h1>{{ mnemonic.title }}</h1>
        <p class="article-description" v-if="mnemonic.description">
          {{ mnemonic.description }}
        </p>
      </header>

      <!-- Article Content -->
      <div class="article-content">
        <ContentRenderer :value="mnemonic" />
      </div>

      <!-- Tags -->
      <footer class="article-footer" v-if="mnemonic.tags?.length">
        <div class="article-tags">
          <h4>Tags</h4>
          <ul>
            <li v-for="tag in mnemonic.tags" :key="tag">
              <NuxtLink :to="`/mnemonics?tag=${tag}`" class="tag-link">
                #{{ tag }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </footer>
    </article>

    <!-- Navigation -->
    <nav class="article-nav">
      <NuxtLink to="/mnemonics" class="nav-back">
        ← Back to Mnemonics
      </NuxtLink>
    </nav>

    <div class="footer-spacer"></div>
  </main>
  <main v-else class="not-found">
    <h1>Mnemonic not found</h1>
    <p>This mnemonic doesn't exist yet.</p>
    <NuxtLink to="/mnemonics" class="nav-back">Back to Mnemonics</NuxtLink>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const route = useRoute()
const slug = route.params.slug as string

// Fetch the specific mnemonic by matching the filename
const { data: mnemonic } = await useAsyncData(`mnemonic-${slug}`, () => {
  return queryCollection('mnemonics').find(item => {
    const filename = item._path?.split('/').pop()?.replace('.md', '') || ''
    return filename === slug
  })?.[0] || null
})

// SEO
useSeoMeta({
  title: computed(() => mnemonic.value?.title || 'Mnemonic'),
  description: computed(() => mnemonic.value?.description || 'Learn this memory technique'),
  ogTitle: computed(() => mnemonic.value?.title),
  ogDescription: computed(() => mnemonic.value?.description),
  ogType: 'article'
})
</script>

<style scoped>
.mnemonic-article {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1rem;
}

.article-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--stone-200);
}

.article-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

.badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--rainbow-blue);
  background-color: var(--stone-100);
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  letter-spacing: 0.05em;
}

.article-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.article-description {
  font-size: 1.125rem;
  color: var(--stone-600);
  line-height: 1.6;
}

.article-content {
  margin: 2rem 0;
  line-height: 1.8;
}

/* Content Renderer styles */
:deep(.article-content h2) {
  font-size: 1.875rem;
  margin: 2rem 0 1rem 0;
  line-height: 1.2;
}

:deep(.article-content h3) {
  font-size: 1.5rem;
  margin: 1.5rem 0 0.75rem 0;
  line-height: 1.2;
}

:deep(.article-content p) {
  margin-bottom: 1rem;
  line-height: 1.8;
}

:deep(.article-content ul) {
  list-style: disc;
  margin: 1rem 0 1rem 1.5rem;
}

:deep(.article-content li) {
  margin-bottom: 0.5rem;
}

:deep(.article-content table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

:deep(.article-content th) {
  background-color: var(--stone-100);
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  border: 1px solid var(--stone-200);
}

:deep(.article-content td) {
  padding: 0.75rem;
  border: 1px solid var(--stone-200);
}

:deep(.article-content code) {
  background-color: var(--stone-100);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
}

:deep(.article-content blockquote) {
  border-left: 3px solid var(--stone-300);
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: var(--stone-700);
  font-style: italic;
}

:deep(.article-content mark) {
  background-color: rgba(252, 191, 73, 0.3);
  padding: 0.125rem 0.25rem;
}

.article-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--stone-200);
}

.article-tags h4 {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--stone-600);
  margin-bottom: 0.75rem;
}

.article-tags ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag-link {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  background-color: var(--stone-100);
  border: 1px solid var(--stone-200);
  border-radius: 0.25rem;
  font-size: 0.875rem;
  color: var(--stone-700);
  transition: all 0.3s ease;
}

.tag-link:hover {
  background-color: var(--stone-200);
  color: var(--stone-900);
}

.article-nav {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem 3rem 1rem;
}

.nav-back {
  display: inline-block;
  font-size: 0.875rem;
  color: var(--rainbow-blue);
  text-decoration: underline;
  transition: color 0.3s ease;
}

.nav-back:hover {
  color: var(--rainbow-indigo);
}

.not-found {
  max-width: 800px;
  margin: 4rem auto;
  padding: 3rem 1rem;
  text-align: center;
}

.not-found h1 {
  color: var(--stone-900);
  margin-bottom: 1rem;
}

.not-found p {
  color: var(--stone-600);
  margin-bottom: 2rem;
}

@media (max-width: 640px) {
  .mnemonic-article {
    padding: 2rem 1rem;
  }

  .article-header h1 {
    font-size: 1.875rem;
  }

  :deep(.article-content h2) {
    font-size: 1.5rem;
  }

  :deep(.article-content h3) {
    font-size: 1.25rem;
  }
}
</style>
