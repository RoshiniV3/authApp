export const logger = {
  info: (msg: string) => console.info(`[INFO]: ${msg}`),
  warn: (msg: string) => console.warn(`[WARN]: ${msg}`),
  error: (msg: string) => console.error(`[ERROR]: ${msg}`),
}