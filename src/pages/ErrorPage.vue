<template>
  <div class="error-page">
    <div class="error-content">
      <h1>{{ errorTitle }}</h1>
      <p>{{ message }}</p>
      <div class="error-actions">
        <router-link :to="ROUTE_PATHS.DASHBOARD" class="btn-primary">Go back to Home</router-link>
        <button @click="goBack" class="btn-secondary">Go Back</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { ROUTE_NAMES, ROUTE_PATHS } from '../models/auth-model'

const route = useRoute()
const router = useRouter()
const message = ref('An unexpected error occurred.')

const errorTitle = computed(() => {
  const errorType = route.meta?.errorType

  if (errorType === 'unauthorized') {
    return 'Access Denied'
  } else if (route.name === ROUTE_NAMES.ERROR_PAGE) {
    return 'Page Not Found'
  }

  return 'Oops! Something went wrong.'
})

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push(ROUTE_PATHS.DASHBOARD)
  }
}

onMounted(() => {
    const errorType = route.meta?.errorType
    if (errorType === 'unauthorized') {
      message.value = 'You do not have permission to access this page.'
    } else if (route.name === ROUTE_NAMES.ERROR_PAGE) {
      message.value = 'The page you are looking for could not be found.'
    }
  
})
</script>

<style scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-content {
  text-align: center;
  background: white;
  padding: 3rem;
}

h1 {
  color: #e74c3c;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

p {
  margin: 1.5rem 0;
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background: #7f8c8d;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .error-content {
    padding: 2rem;
    margin: 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  .error-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn-primary, .btn-secondary {
    width: 100%;
    max-width: 200px;
  }
}
</style>
