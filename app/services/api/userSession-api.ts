import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetUserSessionResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"
import { UserSessionModel } from "../../models/userSession/userSession"

export class UserSessionApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
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
}
