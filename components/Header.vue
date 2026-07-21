<template>
  <header>
    <!-- Hilltopads Banner Ad (optional) -->
    <div style="background-color: var(--stone-50); padding: 0.5rem 1rem;" v-html="hilltopadsScript"></div>
    <div style="background-color: var(--stone-50); border-bottom: 1px solid var(--stone-200);">
      <div class="header-content">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <!-- Logo/Branding -->
          <div class="header-branding">
            <a href="/" style="display: inline-block;">
              <h1>Everything in Perspective</h1>
            </a>
            <p class="header-tagline">Essays on trends, context & nuance</p>
          </div>

          <!-- Desktop Navigation -->
          <nav class="nav-desktop">
            <a href="/">Home</a>
            <template v-for="item in navItems" :key="item.label">
              <a :href="item.href">{{ item.label }}</a>
            </template>
            <SearchBar />
          </nav>

          <!-- Mobile Menu Toggle -->
          <button 
            @click="navOpen = !navOpen" 
            class="nav-toggle"
            :aria-label="navOpen ? 'Close navigation' : 'Open navigation'"
            :aria-expanded="navOpen"
          >
            {{ navOpen ? '✕' : '☰' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <nav 
      v-if="navOpen"
      class="nav-drawer active"
      @click.self="navOpen = false"
    >
      <button 
        @click="navOpen = false"
        class="nav-drawer-close"
        aria-label="Close navigation"
      >
        ✕
      </button>
      <div class="nav-drawer-content">
        <a href="/" @click="navOpen = false">
          Home
        </a>
        <template v-for="item in navItems" :key="item.label">
          <a :href="item.href" @click="navOpen = false">
            {{ item.label }}
          </a>
        </template>
        <div class="nav-drawer-divider">
          <a href="/page/privacy-policy" @click="navOpen = false">
            Privacy Policy
          </a>
          <a href="/page/terms-conditions" @click="navOpen = false">
            Terms & Conditions
          </a>
          <a href="/page/cookie-policy" @click="navOpen = false">
            Cookie Policy
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { shouldShowHeader, getHeaderLabel } from '~/composables/usePageHeaders'

const navOpen = ref(false)

// Build nav items from /pages top-level folders
const navItems = computed(() => {
  const items = [
    // Magazine with sub-items
    { label: 'Magazine', href: '/magazine/articles' },
    { label: 'Dictionary', href: '/dictionary' },
    { label: 'Encyclopedia', href: '/encyclopedia' },
    { label: 'University', href: '/university' }
  ]
  
  // Filter out suppressed items
  return items.filter(item => {
    const folder = item.href.split('/')[1]
    return shouldShowHeader(folder)
  })
})

const hilltopadsScript = '<script async src="//untimely-hello.com/bWX/V/s.d/Gslj0mYdWIcS/keTma9Mu/Z/Uxl/kkPMT/chw/MyjGA/yKNFTfM/tbNFzBA-yPMpDlId1pN-wT" referrerpolicy="no-referrer-when-downgrade"><\/script>'
</script>
