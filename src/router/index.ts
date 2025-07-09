import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../store/auth'

import Login from '../pages/LoginPage.vue'
import Dashboard from '../pages/DashboardPage.vue'
import Admin from '../pages/AdminPage.vue'
import StudentPage from '../pages/StudentPage.vue'
import ErrorPage from '../pages/ErrorPage.vue'
import { ROUTE_NAMES, ROUTE_PATHS } from '../models/auth-model'

// Route component
export const ROUTE_COMPONENTS = {
  Login,
  Dashboard,
  Admin,
  Student: StudentPage,
  ErrorPage,
  Unauthorized: ErrorPage
} as const

const routes = [
  {
    path: ROUTE_PATHS.LOGIN,
    name: ROUTE_NAMES.LOGIN,
    component: ROUTE_COMPONENTS.Login
  },
  {
    path: ROUTE_PATHS.DASHBOARD,
    name: ROUTE_NAMES.DASHBOARD,
    component: ROUTE_COMPONENTS.Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: ROUTE_PATHS.ADMIN,
    name: ROUTE_NAMES.ADMIN,
    component: ROUTE_COMPONENTS.Admin,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: ROUTE_PATHS.STUDENT,
    name: ROUTE_NAMES.STUDENT,
    component: ROUTE_COMPONENTS.Student,
    meta: { requiresAuth: true, roles: ['student'] }
  },
  {
    path: ROUTE_PATHS.UNAUTHORIZED,
    name: ROUTE_NAMES.UNAUTHORIZED,
    component: ROUTE_COMPONENTS.ErrorPage,
    meta: { errorType: 'unauthorized', hideLayout: true, requiresAuth: true }
  },
  {
    path: ROUTE_PATHS.NOT_FOUND,
    name: ROUTE_NAMES.ERROR_PAGE,
    component: ROUTE_COMPONENTS.ErrorPage,
    meta: { hideLayout: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  const userStore = useUserStore()
  const isAuthenticated = userStore.isAuthenticated
  const userRole = userStore.userRole
  const requiresAuth = to.meta.requiresAuth
  const allowedRoles = to.meta.roles as string[] | undefined

  // Redirect unauthenticated users to login if unauthorized route
  if (requiresAuth && !isAuthenticated) {
    return next({ name: ROUTE_NAMES.LOGIN })
  }

  // If user is logged in redirect to their dashboard
  if (((to.name === ROUTE_NAMES.LOGIN && to.meta.errorType !== 'unauthorized') ||
    (to.name === ROUTE_NAMES.ERROR_PAGE && to.meta.errorType !== 'unauthorized')) && isAuthenticated) {
    return next(userStore.getRoleHomePath(userRole))
  }

  // If user is authenticated but not authorized
  if (isAuthenticated && allowedRoles && !allowedRoles.includes(userRole)) {
    return next({ name: ROUTE_NAMES.UNAUTHORIZED })
  }

  next()
})

export default router
