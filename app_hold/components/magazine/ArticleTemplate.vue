<template>
  <div>
    <!-- Article Metadata -->
    <div class="article-header">
      <h1 class="article-title">{{ content.title }}</h1>
      <div class="article-meta">
        <div>
          <p class="article-byline">By <span class="article-author">{{ content.author || 'Staff' }}</span></p>
          <p class="article-date">{{ formatDate(content.date) }}</p>
        </div>
        <span class="article-category">{{ content.category || 'General' }}</span>
      </div>
    </div>

    <!-- Article Content -->
    <div class="article-content">
      <ContentRenderer :value="content" />
    </div>

    <!-- Article Footer -->
    <div class="article-footer">
      <div class="article-author-box">
        <h3 class="article-author-title">About the Author</h3>
        <p class="article-author-bio">{{ content.authorBio || `${content.author || 'Staff'} is a writer exploring context, nuance, and perspective on global trends and ideas.` }}</p>
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
.article-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #1a1a1a;
}

.article-title {
  font-family: Georgia, Garamond, serif;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.article-byline {
  color: #666666;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.article-author {
  font-weight: 700;
}

.article-date {
  color: #666666;
  font-size: 0.875rem;
}

.article-category {
  background-color: #F5F5F5;
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  font-family: Arial, sans-serif;
}

.article-content {
  line-height: 1.7;
  margin-bottom: 4rem;
}

.article-content :deep(p) {
  margin-bottom: 1.5rem;
}

.article-content :deep(h2) {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-size: 1.75rem;
}

.article-content :deep(h3) {
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
}

.article-content :deep(ul) {
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
  list-style: disc inside;
}

.article-content :deep(ul li) {
  margin-bottom: 0.5rem;
}

.article-footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #1a1a1a;
}

.article-author-box {
  background-color: #F5F5F5;
  padding: 2rem;
  border-radius: 4px;
}

.article-author-title {
  font-family: Georgia, Garamond, serif;
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.article-author-bio {
  font-size: 0.875rem;
  color: #666666;
}
</style>
