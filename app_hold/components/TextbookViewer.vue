<template>
  <div>
    <Header />
    
    <!-- Back to site link -->
    <div style="background: var(--stone-100); padding: 1rem; border-bottom: 1px solid var(--stone-200);">
      <div style="max-width: 1440px; margin: 0 auto;">
        <NuxtLink to="/" style="color: var(--stone-900); text-decoration: underline;">
          ← Back to Everything in Perspective
        </NuxtLink>
      </div>
    </div>
    
    <!-- Textbook content wrapper -->
    <div class="textbook-wrapper">
      <div v-if="loading" style="text-align: center; padding: 2rem;">
        Loading...
      </div>
      <div v-else-if="error" style="text-align: center; padding: 2rem; color: red;">
        {{ error }}
      </div>
      <div v-else v-html="htmlContent" class="textbook-content"></div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const htmlContent = ref('')
const loading = ref(true)
const error = ref('')

const loadTextbook = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const slug = route.params.slug || 'polyglot-linguistics'
    const response = await fetch(`/api/textbook/${slug}`)
    
    if (!response.ok) {
      throw new Error('Page not found')
    }
    
    htmlContent.value = await response.text()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load textbook'
  } finally {
    loading.value = false
  }
}

onMounted(loadTextbook)
watch(() => route.params.slug, loadTextbook)
</script>

<style scoped>
.textbook-wrapper {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0;
}

:deep(.textbook-content) {
  padding: 2rem 1rem;
}

/* Ensure textbook assets load from correct path */
:deep(a[href^="_static/"],
       link[href^="_static/"],
       script[src^="_static/"]) {
  /* These will be served from /public/textbook-polyglot/_static/ */
}
</style>
