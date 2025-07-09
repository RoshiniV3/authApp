import axios from 'axios'
import router from '../router'
import { useUserStore } from '../store/auth'
import { logger } from '../utils/logger'
import { handleApiError } from '../utils/errorHandler'
import { env } from '../config/env'
import { ROUTE_NAMES } from '../models/auth-model'

const api = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: env.apiTimeout,
})

api.interceptors.request.use(config => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`
  }
  return config
}, (error: any) => {
  logger.error('Request error: ' + error)
  return Promise.reject(new Error(error?.message || 'Request failed'))
})

api.interceptors.response.use(
  res => res,
  (error: any) => {
    const userStore = useUserStore()

    const errorMessage = handleApiError(error, () => {
      userStore.logout()
      router.push({ name: ROUTE_NAMES.LOGIN })
    })

    if (errorMessage) {
      userStore.error = errorMessage
    }

    return Promise.reject(new Error(error?.message || 'Request failed'))
  }
)

export default api
