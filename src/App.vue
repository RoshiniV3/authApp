<template>
  <div id="app" :class="shouldHideLayout ? 'without-layout' : 'with-layout'">
    <header v-if="!shouldHideLayout">
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from './store/auth'

const route = useRoute()
const userStore = useUserStore()

const shouldHideLayout = computed(() => {
  return route.meta?.hideLayout === true
})

const logout = () => {
  userStore.logout()
}
</script>

<style>
#app {
  font-family: 'Arial', sans-serif;
  min-height: 100vh;
}

#app.with-layout {
  padding: 1rem;
}

#app.without-layout {
  padding: 0;
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

main {
  min-height: calc(100vh - 80px);
}

.without-layout main {
  min-height: 100vh;
}
</style>
