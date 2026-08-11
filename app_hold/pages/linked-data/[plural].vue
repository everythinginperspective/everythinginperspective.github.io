<script setup lang="ts">
const route = useRoute()
const plural = route.params.plural as string

// Redirect to magazine collection (linked-data collections are same as magazine collections)
navigateTo(`/magazine/${plural}`, { redirectCode: 301 })
</script>
