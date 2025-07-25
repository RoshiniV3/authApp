import { env } from '../config/env'
export const HelperService = {
  getStoredValue: (key: string, defaultValue: string = '') => {
    try {
      return localStorage.getItem(key) || defaultValue
    } catch (error) {
      if (env.enableLogging) {
        console.warn(`Failed to read from localStorage: ${error}`)
      }
      return defaultValue
    }
  },

  setStoredValue: (key: string, value: string) => {
    try {
      if (value) {
        localStorage.setItem(key, value)
      } else {
        localStorage.removeItem(key)
      }
    } catch (error) {
      if (env.enableLogging) {
        console.warn(`Failed to write to localStorage: ${error}`)
      }
    }
  }
}