/// <reference types="vite/client" />

import type { NodeEnvironment } from "./models/environments"

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_NODE_ENV: NodeEnvironment

  readonly VITE_API_BASE_URL: string
  readonly VITE_API_TIMEOUT: string

  readonly VITE_AUTH_TOKEN_EXPIRY: string | number

  readonly VITE_ENABLE_LOGGING: 'true' | 'false'
  readonly VITE_ENABLE_DEBUG: 'true' | 'false'
  readonly VITE_ENABLE_ANALYTICS: 'true' | 'false'

  readonly VITE_ENABLE_HOT_RELOAD: 'true' | 'false'
  readonly VITE_ENABLE_DEVTOOLS: 'true' | 'false'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
