import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../store/auth'

import Login from '../pages/LoginPage.vue'
import Dashboard from '../pages/DashboardPage.vue'
import Admin from '../pages/AdminPage.vue'
import StudentPage from '../pages/StudentPage.vue'
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
    path: '/student',
    name: 'Student',
    component: StudentPage,
    meta: { requiresAuth: true, roles: ['student'] }
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: ErrorPage,
    meta: { errorType: 'unauthorized' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'ErrorPage',
    component: ErrorPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isAuthenticated = userStore.isAuthenticated

  const requiresAuth = to.meta?.requiresAuth
  const allowedRoles = to.meta?.roles as string[] | undefined

  if (requiresAuth && !isAuthenticated) {
    return next('/login')
  }

  if (isAuthenticated && allowedRoles && allowedRoles.length > 0) {
    const userRole = userStore.userRole

    if (!allowedRoles.includes(userRole)) {
      const redirectPath = userStore.getRoleHomePath(userRole)
      return next(redirectPath)
    }
  }

  next()
})


export default router
