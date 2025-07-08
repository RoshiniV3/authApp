<template>
  <div class="admin-page">
    <h1>Admin Page</h1>

    <div class="navigation-section">
      <router-link to="/" class="nav-button dashboard-button">
        Go to Dashboard
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.admin-page {
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

.nav-button {
  display: inline-block;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
}

.dashboard-button {
  background-color: #6c757d;
  color: white;
}

.dashboard-button:hover {
  background-color: #5a6268;
  transform: translateY(-2px);
}

h1 {
  color: #333;
  margin-bottom: 1rem;
}
</style>