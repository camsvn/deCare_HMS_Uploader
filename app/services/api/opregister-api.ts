import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetPatientResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"

export class PatientApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getOpById(opid: string): Promise<GetPatientResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        `/opregister?opid=${opid}`
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const patient = response.data

      return { kind: "ok", patient }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
