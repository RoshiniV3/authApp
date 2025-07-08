<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="handleLogin">
      <h2 class="title">User Login</h2>

      <label for="username">Username</label>
      <input
        id="username"
        v-model="username"
        type="text"
        placeholder="Enter your username"
        required
      />

      <label for="password">Password</label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Enter your password"
        required
      />

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../store/auth'

const username = ref('')
const password = ref('')
const userStore = useUserStore()

const handleLogin = () => {
  userStore.login(username.value, password.value)
}
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-form {
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-form .title {
  margin-bottom: 0.5rem;
  text-align: center;
  font-size: 1.5rem;
  color: #111827;
}

.login-form label {
  font-size: 0.875rem;
  color: #374151;
}

.login-form input {
  padding: 0.6rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.95rem;
  outline: none;
  transition: border 0.2s;
}

.login-form input:focus {
  border-color: #6366f1;
}

.login-form button {
  background-color: #6366f1;
  color: white;
  border: none;
  padding: 0.7rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-form button:hover {
  background-color: #4f46e5;
}
</style>
