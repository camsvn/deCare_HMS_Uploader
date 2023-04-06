import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetUploadTomogramResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"
import { TomogramSnapshot } from "../../models/tomogram/tomogram"


export class TomogramApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async uploadTomograms(opid: number, tomograms: TomogramSnapshot[]): Promise<GetUploadTomogramResult> {
    try {
      const formData = new FormData()
      formData.append('opid', opid.toString())

      for (let i=0; i<tomograms.length ; i++) {
        const response = await fetch(tomograms[i].tomogram)
        const blob = await response.blob()
        const ext = blob['_data']["name"].split('.').pop()
        formData.append('images', {
          uri: tomograms[i].tomogram,
          name: `image${tomograms[i].id}.${ext}`,
          type: blob.type
        })
        formData.append(`narrations[${i}]`, tomograms[i].description)
      }

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/tomogram`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })

      // the typical ways to die when calling an api
      if (!response.ok ) {
        console.log(response)
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const tomogramsResponse = response.data.data

      return { kind: "ok", tomograms: tomogramsResponse }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      console.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
