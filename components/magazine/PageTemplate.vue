<template>
  <div>
    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title">{{ content.title }}</h1>
      <p v-if="content.description" class="page-description">{{ content.description }}</p>
    </div>

    <!-- Page Content -->
    <div class="page-content">
      <ContentRenderer :value="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  content: any
}>()
</script>

<style scoped>
.page-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #1a1a1a;
}

.page-title {
  font-family: Georgia, Garamond, serif;
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.page-description {
  font-size: 1.125rem;
  color: #666666;
}

.page-content {
  line-height: 1.7;
}
</style>
