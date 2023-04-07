import { Instance, SnapshotIn, SnapshotOut, addDisposer, cast, flow, types } from "mobx-state-tree"
import { withApiState, withEnvironment } from "../extensions"
import {UserSessionApi} from '../../services/api/userSession-api'
import { Api, GetHealthCheckResult } from "../../services/api"
import { reaction } from "mobx"

/**
 * HMS appConfig model.
 */
export const AppConfigModel = types
  .model("AppConfig")
  .props({
    configURL: types.optional(types.string, ''),
  })
  .extend(withApiState)
  .extend(withEnvironment)
  .actions((self) => {
    // Generic Action to set properties
    // ref: https://blog.pixelkritzel.de/posts/mst-generic-set-method/
    function set<K extends keyof SnapshotIn<typeof self>, T extends SnapshotIn<typeof self>>(
      key: K,
      value: T[K],
    ) {
      self[key] = cast(value)
    }

    function setConfigURL(text: string) {
      self.configURL = text
    }

    function afterCreate() {
      const dispose = reaction(
        () => self.configURL,
        (newValue, oldValue) => {
          const newApi = new Api(newValue)
          self.environment.changeUrl(newApi.config.url)
        }
      );
  
      addDisposer(self, dispose);
    }

    const checkConnection = flow(function* (url: string, callback: (err: any) => void) {
      self._setLoading(true)
      const userSessionApi = new UserSessionApi(self.environment.api)
      const result: GetHealthCheckResult = yield userSessionApi.healthCheck(url)
      self._setLoading(false)
    if (result.kind === "ok" && result.healthCheck.uptime) {
      setConfigURL(url)
      callback(null)
    } else {
      callback(result.kind)
      __DEV__ && console.tron.log(result.kind)
    }
    })

    function reset () {
      self.configURL = ''
    }

    return {
      setConfigURL,
      set,
      checkConnection,
      reset,
      afterCreate
    }
  })

type AppConfigType = Instance<typeof AppConfigModel>
export interface AppConfig extends AppConfigType {}
type AppConfigSnapshotType = SnapshotOut<typeof AppConfigModel>
export interface AppConfigSnapshot extends AppConfigSnapshotType {}
export const createCharacterDefaultModel = () => types.optional(AppConfigModel, {})
