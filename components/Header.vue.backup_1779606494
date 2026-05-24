<template>
  <header>
    <!-- Hilltopads Banner Ad (optional) -->
    <div style="background-color: var(--stone-50); padding: 0.5rem 1rem;" v-html="hilltopadsScript"></div>
    <Breadcrumbs />
    <div style="background-color: var(--stone-50); border-bottom: 1px solid var(--stone-200);">
      <div class="header-content">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <!-- Logo/Branding -->
          <div class="header-branding">
            <NuxtLink to="/" style="display: inline-block;">
              <h1>Everything in Perspective</h1>
            </NuxtLink>
            <p class="header-tagline">Essays on trends, context & nuance</p>
          </div>

          <!-- Desktop Navigation -->
          <nav class="nav-desktop">
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="/magazine/articles">Articles</NuxtLink>
            <NuxtLink to="/magazine/perspectives">Perspectives</NuxtLink>
            <NuxtLink to="/page/faq">FAQ</NuxtLink>
            <NuxtLink to="/page/contact-us">Contact</NuxtLink>
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
        <NuxtLink 
          to="/" 
          @click="navOpen = false"
        >
          Home
        </NuxtLink>
        <NuxtLink 
          to="/magazine/articles" 
          @click="navOpen = false"
        >
          Articles
        </NuxtLink>
        <NuxtLink 
          to="/magazine/perspectives" 
          @click="navOpen = false"
        >
          Perspectives
        </NuxtLink>
        <NuxtLink 
          to="/page/faq" 
          @click="navOpen = false"
        >
          FAQ
        </NuxtLink>
        <NuxtLink 
          to="/page/contact-us" 
          @click="navOpen = false"
        >
          Contact
        </NuxtLink>
        <div class="nav-drawer-divider">
          <NuxtLink 
            to="/page/privacy-policy" 
            @click="navOpen = false"
          >
            Privacy Policy
          </NuxtLink>
          <NuxtLink 
            to="/page/terms-conditions" 
            @click="navOpen = false"
          >
            Terms & Conditions
          </NuxtLink>
          <NuxtLink 
            to="/page/cookie-policy" 
            @click="navOpen = false"
          >
            Cookie Policy
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const navOpen = ref(false)

const hilltopadsScript = '<script async src="//untimely-hello.com/bWX/V/s.d/Gslj0mYdWIcS/keTma9Mu/Z/Uxl/kkPMT/chw/MyjGA/yKNFTfM/tbNFzBA-yPMpDlId1pN-wT" referrerpolicy="no-referrer-when-downgrade"><\/script>'
</script>
