import { readdirSync, statSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import pluralize from 'pluralize'

const contentDir = join(process.cwd(), 'content')
const pagesDir = join(process.cwd(), 'pages')

// Get all content type folders
const folders = readdirSync(contentDir)
  .filter(item => {
    const itemPath = join(contentDir, item)
    return statSync(itemPath).isDirectory()
  })
  .filter(folder => !folder.startsWith('.') && !folder.startsWith('_'))

// Template for magazine collection index
const magazineTemplate = (plural, singular) => `<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
    <div class="mb-12">
      <h1 class="font-serif text-5xl font-bold mb-4 capitalize">${plural}</h1>
      <p class="text-muted text-lg">Browse all ${plural}</p>
    </div>

    <!-- Filter UI will go here once Pagefind is installed -->
    <div class="mb-8">
      <p class="text-sm text-muted">{{ items.length }} ${plural} found</p>
    </div>

    <!-- Content Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="item in items"
        :key="item._path"
        class="border border-accent p-6 hover:shadow-lg transition-shadow"
      >
        <NuxtLink :to="\`/magazine/${singular}/\${item.slug || item._path?.split('/').pop()}\`">
          <h2 class="font-serif text-2xl font-bold mb-2">{{ item.title }}</h2>
          <p v-if="item.description" class="text-muted text-sm mb-4">{{ item.description }}</p>
          <div class="text-xs text-muted">
            <span v-if="item.author">By {{ item.author }}</span>
            <span v-if="item.date"> · {{ formatDate(item.date) }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>

    <div v-if="items.length === 0" class="text-center py-12 text-muted">
      <p>No ${plural} found.</p>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

// Fetch all items of this type
const { data: items } = await useAsyncData(
  '${plural}-index',
  () => queryContent('/${plural}').find()
)

const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

// SEO
useSeoMeta({
  title: \`${plural} | Everything in Perspective\`,
  description: \`Browse all ${plural} on Everything in Perspective\`,
  ogTitle: \`${plural} | Everything in Perspective\`,
  ogDescription: \`Browse all ${plural} on Everything in Perspective\`
})
<\/script>

<style scoped>
.border-accent {
  border-color: #e5e5e5;
}
.border-accent:hover {
  border-color: #1a1a1a;
}
.text-muted {
  color: #666666;
}
</style>
`

// Template for linked-data collection index
const linkedDataTemplate = (plural, singular) => `<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
    <div class="mb-12 border-b-2 border-accent pb-6">
      <div class="text-xs uppercase tracking-wider text-muted mb-2">Linked Data View</div>
      <h1 class="font-serif text-5xl font-bold mb-2 capitalize">${plural}</h1>
      <p class="text-muted">Graph-based view of all ${plural} with relationship connections</p>
    </div>

    <!-- Graph Stats -->
    <div v-if="graph" class="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-light p-4">
        <div class="text-2xl font-bold">{{ items.length }}</div>
        <div class="text-xs text-muted uppercase">Items</div>
      </div>
      <div class="bg-light p-4">
        <div class="text-2xl font-bold">{{ totalConnections }}</div>
        <div class="text-xs text-muted uppercase">Connections</div>
      </div>
    </div>

    <!-- Content List with Connections -->
    <div class="space-y-6">
      <div
        v-for="item in items"
        :key="item._path"
        class="border border-accent p-6"
      >
        <div class="mb-4">
          <NuxtLink :to="\`/linked-data/\${item._path}\`" class="font-serif text-2xl font-bold hover:underline">
            {{ item.title }}
          </NuxtLink>
          <p v-if="item.description" class="text-muted text-sm mt-2">{{ item.description }}</p>
        </div>

        <!-- Connection Preview -->
        <div v-if="getItemConnections(item._path)" class="text-xs">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-if="getItemConnections(item._path)?.authors?.length">
              <strong class="text-muted">Authors:</strong>
              <span class="ml-2">{{ getItemConnections(item._path)?.authors?.length }}</span>
            </div>
            <div v-if="getItemConnections(item._path)?.categories?.length">
              <strong class="text-muted">Categories:</strong>
              <span class="ml-2">{{ getItemConnections(item._path)?.categories?.length }}</span>
            </div>
            <div v-if="getItemConnections(item._path)?.tags?.length">
              <strong class="text-muted">Tags:</strong>
              <span class="ml-2">{{ getItemConnections(item._path)?.tags?.length }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

// Fetch all items and graph data
const [{ data: items }, { data: graph }] = await Promise.all([
  useAsyncData(
    'ld-${plural}-index',
    () => queryContent('/${plural}').find()
  ),
  useAsyncData(
    'graph-data',
    () => $fetch('/graph.json').catch(() => null)
  )
])

const totalConnections = computed(() => {
  if (!graph.value || !items.value) return 0
  return items.value.reduce((acc, item) => {
    const connections = getItemConnections(item._path)
    if (!connections) return acc
    return acc + (connections.authors?.length || 0) + 
                 (connections.categories?.length || 0) + 
                 (connections.tags?.length || 0)
  }, 0)
})

const getItemConnections = (path: string) => {
  if (!graph.value?.nodes) return null
  const node = (graph.value.nodes as any[]).find(n => n.path === path)
  return node?.connections || null
}

// SEO
useSeoMeta({
  title: \`${plural} - Linked Data | Everything in Perspective\`,
  description: \`Graph-based view of all ${plural} with relationship connections\`,
  ogTitle: \`${plural} - Linked Data | Everything in Perspective\`
})
<\/script>

<style scoped>
.border-accent {
  border-color: #e5e5e5;
}
.text-muted {
  color: #666666;
}
.bg-light {
  background-color: #F5F5F5;
}
</style>
`

// Generate pages for each content type
folders.forEach(folder => {
  const singular = pluralize.singular(folder)
  const plural = pluralize.plural(folder)
  
  // Create magazine collection page
  const magPath = join(pagesDir, 'magazine', `${plural}.vue`)
  mkdirSync(join(pagesDir, 'magazine'), { recursive: true })
  writeFileSync(magPath, magazineTemplate(plural, singular))
  console.log(`✓ Created ${magPath}`)
  
  // Create linked-data collection page
  const ldPath = join(pagesDir, 'linked-data', `${plural}.vue`)
  mkdirSync(join(pagesDir, 'linked-data'), { recursive: true })
  writeFileSync(ldPath, linkedDataTemplate(plural, singular))
  console.log(`✓ Created ${ldPath}`)
})

console.log(`\n✓ Generated ${folders.length * 2} static collection pages`)
