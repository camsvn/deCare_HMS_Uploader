import { Api } from "../services/api"
import { ApiConfig } from "../services/api/api-config"

let ReactotronDev
if (__DEV__) {
  const { Reactotron } = require("../services/reactotron")
  ReactotronDev = Reactotron
}

/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */
export class Environment {
  constructor(url: string | undefined = undefined) {
    // create each service
    if (__DEV__) {
      // dev-only services
      this.reactotron = new ReactotronDev()
    }
    const apiConfig: ApiConfig = {
      url,
      timeout: 10000
    }
    this.api = url ? new Api(apiConfig) : new Api()
  }

  async setup() {
    // allow each service to setup
    if (__DEV__) {
      await this.reactotron.setup()
    }
    await this.api.setup()
  }

  changeUrl(newUrl: string) {
    this.api.apisauce.setBaseURL(newUrl)
  }

  /**
   * Reactotron is only available in dev.
   */
  reactotron: typeof ReactotronDev

  /**
   * Our api.
   */
  api: Api
}
