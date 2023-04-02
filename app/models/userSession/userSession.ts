import { Instance, SnapshotOut, flow, types } from "mobx-state-tree"
import { UserSessionApi } from "../../services/api/userSession-api"
import { withApiState, withEnvironment } from "../extensions"

/**
 * UserSession model.
 */
export const UserSessionModel = types.model("userSession").props({
    accessToken: types.maybeNull(types.string),
    refreshToken: types.maybeNull(types.string)
  })
  .extend(withEnvironment)
  .extend(withApiState)
  .volatile(self => ({
    userSessionApi: new UserSessionApi(self.environment.api)
  }))
  .actions((self) => ({
    // fetchTokensee: async (username: string, password: string, callback: (err: any) => void) => {
    //   self._setLoading(true)
    //   const result = await self.userSessionApi.fetchTokens(username, password)
    //   console.log("Amal", result)
    //   self._setLoading(false)
    //   if (result.kind === "ok") {
    //     self.accessToken = result.tokens.accessToken
    //     self.accessToken = result.tokens.refreshToken
    //     callback(null)
    //   } else {
    //     callback(result.kind)
    //     __DEV__ && console.tron.log(result.kind)
    //   }
    // },
    fetchTokens: flow(function* (username: string, password: string, callback: (err: any) => void) {
      self._setLoading(true)
      console.log("API", self.environment.api)
      const fetchTokens = self.userSessionApi.fetchTokens
      type fetchTokensType = ReturnType<typeof fetchTokens> extends Promise<infer R> ? R : ReturnType<typeof fetchTokens>;
      const result: fetchTokensType = yield self.userSessionApi.fetchTokens(username, password)
      console.log("Amal", result)
      self._setLoading(false)
      if (result.kind === "ok") {
        self.accessToken = result.tokens.accessToken
        self.accessToken = result.tokens.refreshToken
        callback(null)
      } else {
        callback(result.kind)
        __DEV__ && console.tron.log(result.kind)
      }
    }),
    fetchAccessToken: () => {
      console.log("Fetch Token")
    },
    clear: () => {
      self.accessToken = null
      self.refreshToken = null
    }
  }))

type UserSessionType = Instance<typeof UserSessionModel>
export interface UserSession extends UserSessionType {}
type UserSessionSnapshotType = SnapshotOut<typeof UserSessionModel>
export interface UserSessionSnapshot extends UserSessionSnapshotType {}
export const createUserSessionDefaultModel = () => types.optional(UserSessionModel, {})