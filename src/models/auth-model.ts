

// Route paths 
export const ROUTE_PATHS = {
  LOGIN: '/login',
  DASHBOARD: '/',
  ADMIN: '/admin',
  STUDENT: '/student',
  UNAUTHORIZED: '/unauthorized',
  NOT_FOUND: '/:pathMatch(.*)*'
} as const

// Route names 
export const ROUTE_NAMES = {
  LOGIN: 'Login',
  DASHBOARD: 'Dashboard',
  ADMIN: 'Admin',
  STUDENT: 'Student',
  UNAUTHORIZED: 'Unauthorized',
  ERROR_PAGE: 'ErrorPage'
} as const