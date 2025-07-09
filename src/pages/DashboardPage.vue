<template>
  <div class="dashboard-page">
    <h1>Dashboard Page</h1>

    <div v-if="userStore.isAuthenticated" class="navigation-section">
      <h2>Welcome, {{ userStore.username }}!</h2>
      <p>Your role: <strong>{{ userStore.userRole }}</strong></p>

      <div class="role-navigation">
        <router-link
          v-if="userStore.userRole === 'admin'"
          :to="ROUTE_PATHS.ADMIN"
          class="nav-button admin-button"
        >
          Go to Admin Panel
        </router-link>

        <router-link
          v-if="userStore.userRole === 'student'"
          :to="ROUTE_PATHS.STUDENT"
          class="nav-button student-button"
        >
          Go to Student Area
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../store/auth'
import { ROUTE_PATHS } from '../models/auth-model'

const userStore = useUserStore()
</script>

<style scoped>
.dashboard-page {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.navigation-section {
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.role-navigation {
  margin-top: 1.5rem;
}

.nav-button {
  display: inline-block;
  padding: 12px 24px;
  margin: 0.5rem;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
}

.admin-button {
  background-color: #dc3545;
  color: white;
}

.admin-button:hover {
  background-color: #c82333;
  transform: translateY(-2px);
}

.student-button {
  background-color: #007bff;
  color: white;
}

.student-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}
h1 {
  color: #333;
  margin-bottom: 1rem;
}

h2 {
  color: #495057;
  margin-bottom: 0.5rem;
}

p {
  margin-bottom: 1rem;
}
</style>