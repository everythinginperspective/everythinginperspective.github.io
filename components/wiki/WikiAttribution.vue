<template>
  <div class="wiki-attribution">
    <div class="wiki-attribution-box">
      <p class="wiki-attribution-text">
        <strong>Source:</strong> This content is adapted from 
        <a :href="sourceUrl" target="_blank" rel="noopener noreferrer">{{ title }} on {{ sourceName }}</a>
      </p>
      <p class="wiki-attribution-license">
        Licensed under 
        <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">
          Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
        </a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  sourceName: {
    type: String,
    required: true,
    validator: (val: string) => ['Wikipedia', 'Wiktionary'].includes(val)
  },
  sourceUrl: {
    type: String,
    required: true,
    validator: (val: string) => val.startsWith('https://')
  },
  title: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.wiki-attribution {
  margin: 2rem 0;
}

.wiki-attribution-box {
  background-color: #f5f5f5;
  border-left: 4px solid #0066cc;
  padding: 1rem;
  border-radius: 4px;
}

.wiki-attribution-text {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #333;
}

.wiki-attribution-license {
  margin: 0;
  font-size: 0.75rem;
  color: #666;
  line-height: 1.6;
}

.wiki-attribution a {
  color: #0066cc;
  text-decoration: none;
}

.wiki-attribution a:hover {
  text-decoration: underline;
}

strong {
  font-weight: 700;
}
</style>
