

import axios from 'axios'
import { logger } from './logger'

export function handleApiError(error: any, logoutFn: () => void): string | null {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const message = error.response?.data?.message || error.message

    if (status === 401) {
      logger.warn('401 Unauthorized — logging out')
      logoutFn()
      return null 
    } else if (status === 403) {
      const errorMsg = 'Access denied.'
      logger.error(errorMsg)
      return errorMsg
    } else if (status && status >= 500) {
      const errorMsg = 'Server error. Please try again later.'
      logger.error(errorMsg)
      return errorMsg
    } else {
      const errorMsg = message || 'An unexpected error occurred.'
      logger.error(errorMsg)
      return errorMsg
    }
  } else {
    const errorMsg = 'Network error. Please check your connection.'
    logger.error('Network or unknown error: ' + error)
    return errorMsg
  }
}
