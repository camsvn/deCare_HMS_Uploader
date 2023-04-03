import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * HMS appConfig model.
 */
export const AppConfigModel = types.model("AppConfig").props({
  configURL: types.maybe(types.string)
})

type AppConfigType = Instance<typeof AppConfigModel>
export interface AppConfig extends AppConfigType {}
type AppConfigSnapshotType = SnapshotOut<typeof AppConfigModel>
export interface AppConfigSnapshot extends AppConfigSnapshotType {}
export const createCharacterDefaultModel = () => types.optional(AppConfigModel, {})
