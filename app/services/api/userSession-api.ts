import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetUserSessionResult, GetHealthCheckResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"
import { UserSessionModel } from "../../models/userSession/userSession"

export class UserSessionApi {
  private api: Api
  private newApi: Api

  constructor(api: Api) {
    this.api = api
  }

  private _setupNewApi(configURL: string) {
    this.newApi = new Api({
      url: configURL + '/api',
      timeout: 10000,
    })
    this.newApi.setup()
  }

  async fetchTokens(username: string, password: string): Promise<GetUserSessionResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        `/auth/login`,
        {username, password}
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const accessToken = response.data.data.accessToken
      const refreshToken = response.data.data.refreshToken 

      const tokens = UserSessionModel.create({accessToken, refreshToken})

      return { kind: "ok", tokens }
    } catch (e) {
      console.log(e)
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async healthCheck(configURL: string): Promise<GetHealthCheckResult> {
    try {
      this._setupNewApi(configURL)
      console.log(this.newApi)
      // make the api call
      const response: ApiResponse<any> = await this.newApi.apisauce.get(
        `/auth/healthcheck`
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        console.log("ERROR :: ", response)
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const healthCheck = response.data.data

      return { kind: "ok", healthCheck }
    } catch (e) {
      console.log(e)
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
