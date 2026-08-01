<template>
  <main class="test-main">
    <h1>Query Test</h1>
    
    <section>
      <h2>Test 1: Pages Collection</h2>
      <p v-if="pageResult">✅ Found: {{ pageResult.title }}</p>
      <p v-else>❌ Not found</p>
    </section>

    <section>
      <h2>Test 2: Articles Collection</h2>
      <p v-if="articleResult">✅ Found: {{ articleResult.title }}</p>
      <p v-else>❌ Not found</p>
    </section>

    <section>
      <h2>Test 3: Mnemonics Collection</h2>
      <p v-if="mnemonicResult">✅ Found: {{ mnemonicResult.title }}</p>
      <p v-else>❌ Not found</p>
    </section>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

// Test 1: queryCollection('pages').path('/about') — NO /pages/ prefix
const { data: pageResult } = await useAsyncData('test-page', () =>
  queryCollection('pages').path('/about').first()
)

// Test 2: queryCollection('articles').path('/2-bundesliga-economic-inequality.en') — NO /articles/ prefix
const { data: articleResult } = await useAsyncData('test-article', () =>
  queryCollection('articles').path('/2-bundesliga-economic-inequality.en').first()
)

// Test 3: queryCollection('mnemonics').path('/acrostic') — NO /mnemonics/ prefix
const { data: mnemonicResult } = await useAsyncData('test-mnemonic', () =>
  queryCollection('mnemonics').path('/acrostic').first()
)
</script>

<style scoped>
.test-main {
  max-width: 56rem;
  margin: 0 auto;
  padding: 3rem 1rem;
}

section {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ccc;
}

h2 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

p {
  margin: 0.5rem 0;
}
</style>
