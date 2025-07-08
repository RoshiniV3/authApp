import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../store/auth'

import Login from '../pages/LoginPage.vue'
import Dashboard from '../pages/DashboardPage.vue'
import Admin from '../pages/AdminPage.vue'
import ErrorPage from '../pages/ErrorPage.vue'

const routes = [
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'ErrorPage',
    component: ErrorPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  const isAuthenticated = !!userStore.token
  const requiredRoles = to.meta?.roles as string[] | undefined
  const requiresAuth = to.meta?.requiresAuth

  console.log('Navigating to:', to.name)
  console.log('to.meta:', to.meta)
  console.log('requiresAuth:', requiresAuth)
  console.log('requiredRoles:', requiredRoles)

  if (requiresAuth && !isAuthenticated) {
    return next('/login')
  }

  if (requiredRoles && !requiredRoles.includes(userStore.role)) {
    return next('/')
  } 

  next()
})

export default router
