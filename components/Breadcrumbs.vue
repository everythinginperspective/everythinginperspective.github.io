<template>
  <nav v-if="breadcrumbs.length > 1" class="breadcrumbs-nav">
    <div class="breadcrumbs-content">
      <ol class="breadcrumbs-list">
        <li v-for="(crumb, index) in breadcrumbs" :key="crumb.to" class="breadcrumbs-item">
          <a
            :href="crumb.to"
            :class="index === breadcrumbs.length - 1 ? 'breadcrumbs-active' : 'breadcrumbs-link'"
          >
            {{ crumb.label }}
          </a>
          <span v-if="index < breadcrumbs.length - 1" class="breadcrumbs-sep">/</span>
        </li>
      </ol>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { breadcrumbs } = useBreadcrumbs()
</script>

<style scoped>
.breadcrumbs-nav {
  border-b: 1px solid #e5e5e5;
  background-color: #fafafa;
}

.breadcrumbs-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
}

.breadcrumbs-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

.breadcrumbs-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.breadcrumbs-link {
  color: #000000;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumbs-link:hover {
  text-decoration: underline;
}

.breadcrumbs-active {
  color: #666666;
  font-weight: 600;
  cursor: default;
  pointer-events: none;
}

.breadcrumbs-sep {
  color: #666666;
}
</style>
