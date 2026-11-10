<template>
  <main class="auth-main">
    <form class="auth-form" @submit.prevent="submit">
      <h1>Log in</h1>
      <label>
        Email
        <input v-model="email" type="email" required autocomplete="email">
      </label>
      <label>
        Password
        <input v-model="password" type="password" required autocomplete="current-password">
      </label>
      <p v-if="error" role="alert" class="auth-error">{{ error }}</p>
      <button type="submit" :disabled="loading">{{ loading ? 'Logging in...' : 'Log in' }}</button>
      <p>New here? <a href="/register">Create an account</a></p>
    </form>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const route = useRoute()
const { fetch: refreshSession } = useUserSession()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })
    await refreshSession()
    await navigateTo((route.query.redirect as string) || '/university')
  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Login failed'
  } finally {
    loading.value = false
  }
}

useSeoMeta({ title: 'Log in | Everything in Perspective' })
</script>

<style scoped>
.auth-main {
  max-width: 420px;
  margin: 3rem auto;
  padding: 0 1rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth-form label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.auth-form input {
  padding: 0.6rem;
  border: 1px solid var(--stone-300);
  border-radius: 0.375rem;
}

.auth-form button {
  padding: 0.7rem;
  border-radius: 0.375rem;
  cursor: pointer;
}

.auth-error {
  color: #b91c1c;
}
</style>
