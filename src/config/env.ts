import { NodeEnvironment } from "../models/environments"

class EnvironmentService {
  get appName(): string {
    return import.meta.env.VITE_APP_NAME || 'Vue3 Auth App'
  }

  get nodeEnv(): NodeEnvironment {
    return (import.meta.env.VITE_NODE_ENV as NodeEnvironment) || NodeEnvironment.DEVELOPMENT
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === NodeEnvironment.DEVELOPMENT
  }

  get isProduction(): boolean {
    return this.nodeEnv === NodeEnvironment.PRODUCTION
  }

  get apiBaseUrl(): string {
    const url = import.meta.env.VITE_API_BASE_URL
    if (!url) {
      throw new Error('VITE_API_BASE_URL is required')
    }
    return url
  }

  get apiTimeout(): number {
    return parseInt(import.meta.env.VITE_API_TIMEOUT || '5000', 10)
  }

  get authTokenKey(): string {
    return import.meta.env.VITE_AUTH_TOKEN_KEY || 'auth_token'
  }
  // Feature flags
  get enableLogging(): boolean {
    return import.meta.env.VITE_ENABLE_LOGGING === 'true'
  }

  get enableDebug(): boolean {
    return import.meta.env.VITE_ENABLE_DEBUG === 'true'
  }
  get enableHotReload(): boolean {
    return import.meta.env.VITE_ENABLE_HOT_RELOAD === 'true'
  }

  get enableDevtools(): boolean {
    return import.meta.env.VITE_ENABLE_DEVTOOLS === 'true'
  }


  validateEnvironment(): void {
    const requiredVars = [
      'VITE_API_BASE_URL'
    ]

    const missing = requiredVars.filter(varName => !import.meta.env[varName])

    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
    }
  }

  logEnvironment(): void {
    if (!this.isDevelopment) return
    console.log('App Name:', this.appName)
    console.log('Environment:', this.nodeEnv)
    console.log('API Base URL:', this.apiBaseUrl)
    console.log('API Timeout:', this.apiTimeout)
    console.log('Enable Logging:', this.enableLogging)
    console.log('Enable Debug:', this.enableDebug)
    console.groupEnd()
  }
}

// Export singleton instance
export const env = new EnvironmentService()

// Validate environment on module load
env.validateEnvironment()

// Log environment in development
if (env.isDevelopment && env.enableDebug) {
  env.logEnvironment()
}
