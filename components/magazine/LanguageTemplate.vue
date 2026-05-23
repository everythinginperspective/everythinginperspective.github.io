<template>
  <div>
    <!-- Language Header -->
    <div class="language-header">
      <div class="language-emoji">🌐</div>
      <h1 class="language-title">{{ content.title }}</h1>
      <p v-if="content.code" class="language-code">Language Code: {{ content.code }}</p>
    </div>

    <!-- Language Content -->
    <div class="language-content">
      <ContentRenderer :value="content" />
    </div>

    <!-- Available Content -->
    <div class="language-footer">
      <h3 class="language-section-title">Content in {{ content.title }}</h3>
      <p class="language-description">Articles, perspectives, and pages available in this language will be listed here.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  content: any
}>()
</script>

<style scoped>
.language-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #1a1a1a;
  text-align: center;
}

.language-emoji {
  font-size: 3.75rem;
  margin-bottom: 1rem;
  display: block;
}

.language-title {
  font-family: Georgia, Garamond, serif;
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.language-code {
  font-size: 0.875rem;
  color: #666666;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.language-content {
  line-height: 1.7;
  margin-bottom: 4rem;
}

.language-footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #1a1a1a;
}

.language-section-title {
  font-family: Georgia, Garamond, serif;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.language-description {
  font-size: 0.875rem;
  color: #666666;
}
</style>
