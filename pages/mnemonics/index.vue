<script setup lang="ts">
const { data: mnemonics } = await useAsyncData('mnemonics-list', () => {
return queryCollection('mnemonics').limit(20).all()
})
</script>

<template>
  <div>
    <h1>Mnemonics</h1>
    <ul>
      <li v-for="mnemonic in mnemonics" :key="mnemonic._path">
        <NuxtLink :to="mnemonic._path">{{ mnemonic.title || mnemonic._path }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
