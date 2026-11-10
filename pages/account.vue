<template>
  <main class="account-main">
    <h1>Your account</h1>
    <p>Signed in as {{ session?.user?.email }}</p>
    <p>
      Subscription:
      <strong>{{ session?.subscribed ? 'Active' : 'None' }}</strong>
    </p>
    <p v-if="!session?.subscribed"><a href="/pricing">Subscribe to unlock courses</a></p>
    <button @click="logout">Log out</button>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const { data: session } = await useFetch('/api/auth/session')
if (!session.value?.user) {
  await navigateTo('/login?redirect=/account')
}

const { clear } = useUserSession()

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await clear()
  await navigateTo('/')
}

useSeoMeta({ title: 'Your account | Everything in Perspective' })
</script>

<style scoped>
.account-main {
  max-width: 640px;
  margin: 3rem auto;
  padding: 0 1rem;
}

.account-main button {
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  border-radius: 0.375rem;
  cursor: pointer;
}
</style>
