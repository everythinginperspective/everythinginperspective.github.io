<template>
  <div v-if="pageHeader" class="page-header-container">
    <div class="page-header-content">
      <h2 v-if="pageHeader.isSubPage" class="page-header-breadcrumb">
        {{ pageHeader.topLevelLabel }}
      </h2>
      <h1 class="page-header-title">
        {{ pageHeader.subLevelLabel || pageHeader.topLevelLabel }}
      </h1>
    </div>
    <div class="page-header-accent"></div>
  </div>
</template>

<script setup lang="ts">
const { pageHeader } = usePageHeaders()
</script>

<style scoped>
.page-header-container {
  border-bottom: 1px solid var(--stone-200);
  background-color: var(--stone-50);
  padding: 2rem 1rem;
  margin-bottom: 2rem;
}

.page-header-content {
  max-width: 1440px;
  margin: 0 auto;
}

.page-header-breadcrumb {
  font-size: 0.875rem;
  color: var(--stone-600);
  margin-bottom: 0.5rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.page-header-title {
  font-size: 2.5rem;
  line-height: 1.2;
  margin: 0;
  color: var(--stone-900);
  font-family: Georgia, Garamond, serif;
  font-weight: 400;
}

.page-header-accent {
  height: 0.25rem;
  width: 4rem;
  background: linear-gradient(
    to right,
    var(--rainbow-red),
    var(--rainbow-yellow) 25%,
    var(--rainbow-green) 50%,
    var(--rainbow-blue) 75%,
    var(--rainbow-violet)
  );
  margin-top: 1rem;
}

@media (max-width: 640px) {
  .page-header-container {
    padding: 1.5rem 1rem;
    margin-bottom: 1.5rem;
  }

  .page-header-title {
    font-size: 1.875rem;
  }

  .page-header-breadcrumb {
    font-size: 0.75rem;
  }
}
</style>
