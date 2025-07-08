<template>
  <div class="error-page">
    <h1>Oops! Something went wrong.</h1>
    <p>{{ message }}</p>
    <router-link to="/">Go back to Home</router-link>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const message = ref('An unexpected error occurred.')

onMounted(() => {
  if (route.query && route.query.message) {
    message.value = String(route.query.message)
  }
})
</script>

<style scoped>
.error-page {
  text-align: center;
  margin-top: 3rem;
}
h1 {
  color: crimson;
}
p {
  margin: 1rem 0;
  font-size: 1.1rem;
}
</style>
