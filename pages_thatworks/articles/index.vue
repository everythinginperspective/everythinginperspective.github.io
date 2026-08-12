<script setup lang="ts">
const { data: articles } = await useAsyncData('articles-list', () => {
return queryCollection('articles').limit(20).all()
})
</script>

<template>
  <div>
    <h1>Articles</h1>
    <ul>
      <li v-for="article in articles" :key="article._path">
        <NuxtLink :to="article._path">{{ article.title || article._path }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
