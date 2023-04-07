// Use this import if you want to use "env.js" file
const { API_URL } = require("../../config/env")
// Or just specify it directly like this:
// const API_URL = "http://example.com"
// console.log("Api URL", API_URL);

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG = (url?: string): ApiConfig => {
  const apiPrefix = 'api'
  const getURL = (url?: string) => {
    const baseURL = url || API_URL || "https://jsonplaceholder.typicode.com"
    return `${baseURL}/${apiPrefix}`
  }

  // const defaultConfig = {
  //   url: `${API_URL}/api` || "https://jsonplaceholder.typicode.com",
  //   timeout: 10000,
  // }

  const defaultConfig = {
    url: getURL(url),
    timeout: 10000,
  }

  return defaultConfig
}
