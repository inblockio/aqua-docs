import specraConfigJson from "../specra.config.json"
import { SpecraConfig, defaultConfig } from "./config.types"

/**
 * Deep merge two objects
 */
function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target }

  for (const key in source) {
    const sourceValue = source[key]
    const targetValue = result[key]

    if (sourceValue && typeof sourceValue === "object" && !Array.isArray(sourceValue)) {
      result[key] = deepMerge(
        targetValue && typeof targetValue === "object" ? targetValue : {},
        sourceValue,
      ) as T[Extract<keyof T, string>]
    } else if (sourceValue !== undefined) {
      result[key] = sourceValue as T[Extract<keyof T, string>]
    }
  }

  return result
}

/**
 * Load and parse the Specra configuration file
 * Falls back to default configuration if file doesn't exist or is invalid
 */
export function loadConfig(): SpecraConfig {
  try {
    const userConfig = specraConfigJson as unknown as Partial<SpecraConfig>
    
    // Merge user config with defaults
    const config = deepMerge(defaultConfig, userConfig)

    return config
  } catch (error) {
    console.error(`❌ Error loading configuration:`, error)
    console.warn("Using default configuration.")
    return defaultConfig
  }
}

/**
 * Get a specific configuration value by path (SERVER ONLY)
 * Example: getConfigValue('site.title') or getConfigValue('theme.defaultMode')
 */
export function getConfigValue<T = any>(path: string, config?: SpecraConfig): T | undefined {
  const cfg = config || loadConfig()
  const keys = path.split(".")
  let value: any = cfg

  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key]
    } else {
      return undefined
    }
  }

  return value as T
}

/**
 * Replace environment variables in a string (SERVER ONLY)
 * Supports ${ENV_VAR} and {{ENV_VAR}} syntax
 */
export function replaceEnvVariables(text: string, config?: SpecraConfig): string {
  const cfg = config || loadConfig()
  const envVars = cfg.env || {}

  let result = text

  // Replace ${VAR} syntax
  result = result.replace(/\$\{([^}]+)\}/g, (match, varName) => {
    return envVars[varName] || match
  })

  // Replace {{VAR}} syntax
  result = result.replace(/\{\{([^}]+)\}\}/g, (match, varName) => {
    return envVars[varName] || match
  })

  return result
}

/**
 * Process content and replace all environment variables (SERVER ONLY)
 */
export function processContentWithEnv(content: string, config?: SpecraConfig): string {
  return replaceEnvVariables(content, config)
}

/**
 * Validate configuration (basic validation) (SERVER ONLY)
 */
export function validateConfig(config: SpecraConfig): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Required fields
  if (!config.site?.title) {
    errors.push("site.title is required")
  }

  // URL validation
  if (config.site?.url) {
    try {
      new URL(config.site.url)
    } catch {
      errors.push("site.url must be a valid URL")
    }
  }

  // Social links validation
  if (config.social) {
    const socialKeys = ["github", "twitter", "discord", "linkedin", "youtube"] as const
    for (const key of socialKeys) {
      const url = config.social[key]
      if (url) {
        try {
          new URL(url)
        } catch {
          errors.push(`social.${key} must be a valid URL`)
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// Singleton instance
let configInstance: SpecraConfig | null = null

/**
 * Get the configuration instance (cached) (SERVER ONLY)
 */
export function getConfig(): SpecraConfig {
  if (!configInstance) {
    configInstance = loadConfig()
  }
  return configInstance
}

/**
 * Reload the configuration (useful for development) (SERVER ONLY)
 */
export function reloadConfig(): SpecraConfig {
  configInstance = null
  return getConfig()
}

/**
 * Export the loaded config as default (SERVER ONLY)
 */
export default getConfig()
