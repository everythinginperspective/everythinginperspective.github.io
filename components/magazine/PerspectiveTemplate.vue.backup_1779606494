<template>
  <div>
    <!-- Perspective Header -->
    <div class="perspective-header">
      <div class="perspective-label">Perspective</div>
      <h1 class="perspective-title">{{ content.title }}</h1>
      <p v-if="content.subtitle" class="perspective-subtitle">{{ content.subtitle }}</p>
      <div class="perspective-meta">
        <div>
          <p class="perspective-byline">By <span class="perspective-author">{{ content.author || 'Editorial Team' }}</span></p>
          <p class="perspective-date">{{ formatDate(content.date) }}</p>
        </div>
        <span v-if="content.category" class="perspective-category">{{ content.category }}</span>
      </div>
    </div>

    <!-- Perspective Content -->
    <div class="perspective-content">
      <ContentRenderer :value="content" />
    </div>

    <!-- Perspective Footer -->
    <div class="perspective-footer">
      <div class="perspective-summary-box">
        <h3 class="perspective-summary-title">This Perspective</h3>
        <p class="perspective-summary-text">{{ content.summary || 'An exploration of context, nuance, and multiple viewpoints on this topic.' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  content: any
}>()

const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}
</script>

<style scoped>
.perspective-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #1a1a1a;
}

.perspective-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
  font-weight: 700;
  display: block;
}

.perspective-title {
  font-family: Georgia, Garamond, serif;
  font-size: 3.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.perspective-subtitle {
  font-size: 1.5rem;
  color: #666666;
  margin-bottom: 1.5rem;
}

.perspective-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.perspective-byline {
  color: #666666;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.perspective-author {
  font-weight: 700;
}

.perspective-date {
  color: #666666;
  font-size: 0.875rem;
}

.perspective-category {
  background-color: #1a1a1a;
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  font-family: Arial, sans-serif;
}

.perspective-content {
  line-height: 1.8;
  font-size: 1.125rem;
  margin-bottom: 4rem;
}

.perspective-content :deep(p) {
  margin-bottom: 2rem;
}

.perspective-content :deep(h2) {
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.perspective-footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 2px solid #1a1a1a;
}

.perspective-summary-box {
  background-color: #1a1a1a;
  color: white;
  padding: 2rem;
  border-radius: 4px;
}

.perspective-summary-title {
  font-family: Georgia, Garamond, serif;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.perspective-summary-text {
  font-size: 0.875rem;
}
</style>
