<template>
  <div id="app">
    <header>
      <h1>My Secure App</h1>
      <div v-if="userStore.token">
        Logged in as: <strong>{{ userStore.username }}</strong> ({{ userStore.role }})
        <button @click="logout">Logout</button>
      </div>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from './store/auth'
const userStore = useUserStore()

const logout = () => {
  userStore.logout()
}
</script>

<style>
#app {
  font-family: 'Arial', sans-serif;
  padding: 1rem;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
button {
  margin-left: 1rem;
}
</style>
