export const NodeEnvironment = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production'
} as const

export type NodeEnvironment = typeof NodeEnvironment[keyof typeof NodeEnvironment]