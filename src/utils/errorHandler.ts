

import axios from 'axios'
import { logger } from './logger'

export function handleApiError(error: any, logoutFn: () => void): void {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status

    if (status === 401) {
      logger.warn('401 Unauthorized — logging out')
      logoutFn()
    } else if (status === 403) {
      alert('Access denied.')
    } else if (status && status >= 500) {
      alert('Server error.')
    } else {
      alert(error.message || 'Unknown error')
    }
  } else {
    logger.error('Network or unknown error: ' + error)
    alert('Network error.')
  }
}
