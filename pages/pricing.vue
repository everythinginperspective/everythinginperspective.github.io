<template>
  <main class="pricing-main">
    <h1>Subscribe</h1>
    <p>One subscription unlocks every University course.</p>

    <div v-if="session?.subscribed" class="pricing-card">
      <p>You have an active subscription.</p>
      <a href="/university">Go to courses</a>
    </div>

    <div v-else class="pricing-card">
      <button :disabled="starting" @click="subscribe">
        {{ starting ? 'Opening checkout...' : 'Subscribe' }}
      </button>
      <p v-if="checkoutError" role="alert" class="pricing-error">{{ checkoutError }}</p>
    </div>

    <p v-if="!session?.user">
      Already have an account? <a href="/login?redirect=/pricing">Log in</a>
    </p>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const { data: session } = await useFetch('/api/auth/session')

const starting = ref(false)
const checkoutError = ref('')

async function subscribe() {
  // Account first, so the Whop purchase can be linked to a user
  if (!session.value?.user) {
    await navigateTo('/register?redirect=/pricing')
    return
  }

  starting.value = true
  checkoutError.value = ''
  try {
    const { url } = await $fetch<{ url: string }>('/api/billing/checkout', { method: 'POST' })
    window.location.href = url
  } catch (e: any) {
    checkoutError.value = e?.data?.statusMessage || 'Could not start checkout'
    starting.value = false
  }
}

useSeoMeta({ title: 'Subscribe | Everything in Perspective' })
</script>

<style scoped>
.pricing-main {
  max-width: 640px;
  margin: 3rem auto;
  padding: 0 1rem;
}

.pricing-card {
  margin: 2rem 0;
  padding: 2rem;
  border: 1px solid var(--stone-200);
  border-radius: 0.5rem;
}

.pricing-card button {
  padding: 0.7rem 1.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
}

.pricing-error {
  color: #b91c1c;
}
</style>
