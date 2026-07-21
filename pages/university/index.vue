<template>
  <main class="university-main">
    <div class="university-container">
      <h1>University Courses</h1>
      <p class="university-subtitle">Interactive textbooks and learning materials</p>
      
      <div class="courses-grid">
        <NuxtLink 
          v-for="course in courses" 
          :key="course.name"
          :to="`/university/${course.name}/`"
          class="course-card"
        >
          <h2>{{ course.label }}</h2>
          <p>{{ course.description }}</p>
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

// Course metadata (add descriptions here)
const courseMetadata: Record<string, { label: string; description: string }> = {
  'course-multilingual': {
    label: 'How To Be Multilingual FAST',
    description: 'Learning Languages Through Comparative Study'
  },
  'course-quantum-theories': {
    label: 'Quantum Theories',
    description: 'Interactive course on quantum mechanics'
  },
  'course-engineering-through-making': {
    label: 'Engineering Through Making',
    description: 'Hands-on engineering principles and practice'
  },
  'course-ai-universe': {
    label: 'Traversing the Universe of AI',
    description: 'Exploring artificial intelligence and machine learning'
  }
}

// Dynamically read available courses from /courses/ directory
const { data: folderNames } = await useFetch('/api/university/courses')

const courses = computed(() => {
  if (!folderNames.value) return []
  
  return (folderNames.value as string[])
    .filter((name: string) => name.startsWith('course-'))
    .map((name: string) => ({
      name,
      label: courseMetadata[name]?.label || toTitleCase(name),
      description: courseMetadata[name]?.description || 'Interactive course content'
    }))
})

// Helper to convert folder names to title case
const toTitleCase = (str: string) => {
  return str
    .replace('course-', '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// SEO
useSeoMeta({
  title: 'University Courses | Everything in Perspective',
  description: 'Browse interactive textbooks and university courses',
  ogTitle: 'University Courses',
  ogDescription: 'Browse interactive textbooks and university courses'
})
</script>

<style scoped>
.university-main {
  max-width: 1440px;
  margin: 0 auto;
  padding: 3rem 1rem;
}

.university-container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-family: Georgia, Garamond, serif;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.university-subtitle {
  font-size: 1.125rem;
  color: var(--stone-600);
  margin-bottom: 3rem;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.course-card {
  display: block;
  padding: 2rem;
  border: 1px solid var(--stone-200);
  border-radius: 0.5rem;
  background-color: var(--stone-100);
  text-decoration: none;
  transition: all 0.3s ease;
}

.course-card:hover {
  border-color: var(--stone-400);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.course-card h2 {
  font-family: Georgia, Garamond, serif;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--stone-900);
}

.course-card p {
  font-size: 0.875rem;
  color: var(--stone-600);
  margin: 0;
}

@media (max-width: 640px) {
  .university-main {
    padding: 2rem 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  .courses-grid {
    grid-template-columns: 1fr;
  }
}
</style>
