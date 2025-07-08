import axios from 'axios'
import router from '../router'
import { useUserStore } from '../store/auth'
import { logger } from '../utils/logger'
import { handleApiError } from '../utils/errorHandler'

const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
  timeout: 5000,
})

api.interceptors.request.use(config => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`
  }
  return config
}, error => {
  logger.error('Request error: ' + error)
    return Promise.reject(error) })

api.interceptors.response.use(
  res => res,
  error => {
    const userStore = useUserStore()

    handleApiError(error, () => {
      userStore.logout()
      router.push({ name: 'login' })
    })

    return Promise.reject(error) 
  }
)

export default api
