/**
 * Client-safe config access
 * This file re-exports server functions but is safe to import in client components
 * The actual config loading happens on the server and is passed as props
 */

export { defaultConfig } from "./config.types"
export type { SpecraConfig } from "./config.types"

// For client components, config should be passed as props from server components
// These are re-exported for convenience but will only work on the server
export {
  getConfig,
  getConfigValue,
  loadConfig,
  processContentWithEnv,
  replaceEnvVariables,
  validateConfig,
  reloadConfig,
} from "./config.server"
