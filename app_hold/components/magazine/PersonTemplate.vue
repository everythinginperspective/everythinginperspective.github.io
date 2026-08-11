<template>
  <div>
    <!-- Person Header -->
    <div class="person-header">
      <div v-if="content.image" class="person-image-wrapper">
        <img :src="content.image" :alt="content.title" class="person-image" />
      </div>
      <h1 class="person-title">{{ content.title }}</h1>
      <p v-if="content.role" class="person-role">{{ content.role }}</p>
      <div v-if="content.social" class="person-social">
        <a v-if="content.social.twitter" :href="content.social.twitter" class="social-link">Twitter</a>
        <a v-if="content.social.linkedin" :href="content.social.linkedin" class="social-link">LinkedIn</a>
        <a v-if="content.social.website" :href="content.social.website" class="social-link">Website</a>
      </div>
    </div>

    <!-- Bio Content -->
    <div class="person-content">
      <ContentRenderer :value="content" />
    </div>

    <!-- Articles by this person (if available) -->
    <div class="person-footer">
      <h3 class="person-contributions-title">Contributions</h3>
      <p class="person-contributions-text">Articles and perspectives by {{ content.title }} will appear here.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  content: any
}>()
</script>

<style scoped>
.person-header {
  margin-bottom: 3rem;
  text-align: center;
}

.person-image-wrapper {
  margin-bottom: 1.5rem;
}

.person-image {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  margin: 0 auto;
  object-fit: cover;
  display: block;
}

.person-title {
  font-family: Georgia, Garamond, serif;
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.person-role {
  font-size: 1.125rem;
  color: #666666;
  margin-bottom: 1rem;
}

.person-social {
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 0.875rem;
}

.social-link {
  color: #1a1a1a;
  text-decoration: none;
}

.social-link:hover {
  text-decoration: underline;
}

.person-content {
  line-height: 1.7;
  margin-bottom: 4rem;
}

.person-content :deep(ul) {
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
  list-style: disc inside;
}

.person-content :deep(ul li) {
  margin-bottom: 0.5rem;
}

.person-footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #1a1a1a;
}

.person-contributions-title {
  font-family: Georgia, Garamond, serif;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.person-contributions-text {
  font-size: 0.875rem;
  color: #666666;
}
</style>
