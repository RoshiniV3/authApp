

import axios from 'axios'
import { logger } from './logger'

export function handleApiError(error: any, logoutFn: () => void): string | null {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const message = error.response?.data?.message || error.message

    // Check for CORS errors
    if (error.code === 'ERR_NETWORK' || error.message?.includes('CORS')) {
      const errorMsg = 'Unable to connect to server. Please check if the API server is running and CORS is properly configured.'
      logger.error('CORS or network error: ' + error.message)
      return errorMsg
    }

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
    } else if (status === 0) {
      // Status 0 often indicates CORS or network issues
      const errorMsg = 'Unable to connect to server. Please check your network connection and server availability.'
      logger.error('Network connection error (status 0)')
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
