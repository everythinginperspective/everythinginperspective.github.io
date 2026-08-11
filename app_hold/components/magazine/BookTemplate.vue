<template>
  <div>
    <!-- Book Header -->
    <div class="book-header">
      <div class="book-label">Book</div>
      <h1 class="book-title">{{ content.title }}</h1>
      <p v-if="content.author" class="book-author">by {{ content.author }}</p>
      <p v-if="content.year" class="book-year">({{ content.year }})</p>
      <div v-if="content.image" class="book-image-wrapper">
        <img :src="content.image" :alt="content.title" class="book-image" />
      </div>
    </div>

    <!-- Book Content -->
    <div class="book-content">
      <ContentRenderer :value="content" />
    </div>

    <!-- Book Metadata -->
    <div v-if="content.isbn || content.publisher" class="book-metadata">
      <div class="book-metadata-box">
        <h3 class="book-metadata-title">Publication Details</h3>
        <p v-if="content.publisher" class="book-metadata-item"><strong>Publisher:</strong> {{ content.publisher }}</p>
        <p v-if="content.isbn" class="book-metadata-item"><strong>ISBN:</strong> {{ content.isbn }}</p>
        <p v-if="content.pages" class="book-metadata-item"><strong>Pages:</strong> {{ content.pages }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  content: any
}>()
</script>

<style scoped>
.book-header {
  margin-bottom: 3rem;
  text-align: center;
}

.book-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #666666;
  margin-bottom: 0.75rem;
  display: block;
}

.book-title {
  font-family: Georgia, Garamond, serif;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.book-author {
  font-size: 1.25rem;
  color: #666666;
  margin-bottom: 0.5rem;
}

.book-year {
  font-size: 0.875rem;
  color: #666666;
  margin-bottom: 1.5rem;
}

.book-image-wrapper {
  max-width: 448px;
  margin: 0 auto 2rem;
}

.book-image {
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.book-content {
  line-height: 1.7;
  margin-bottom: 4rem;
}

.book-content :deep(ul) {
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
  list-style: disc inside;
}

.book-content :deep(ul li) {
  margin-bottom: 0.5rem;
}

.book-metadata {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #1a1a1a;
}

.book-metadata-box {
  background-color: #F5F5F5;
  padding: 1.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.book-metadata-title {
  font-family: Georgia, Garamond, serif;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.book-metadata-item {
  margin-bottom: 0.25rem;
}
</style>
