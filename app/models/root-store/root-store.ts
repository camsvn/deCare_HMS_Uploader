import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CharacterStoreModel } from "../character-store/character-store"
import { PatientModel } from '../patient/patient'
import { RecentSearchesModel } from '../recentSearch/recentSearch'
import { UserSessionModel } from '../userSession/userSession'
import { AppConfigModel } from '../appConfig/appConfig'

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  opStore: types.optional(PatientModel, {} as any),
  recentSearchesStore: types.optional(RecentSearchesModel, {} as any),
  userSession: types.optional(UserSessionModel, {} as any),
  appConfig: types.optional(AppConfigModel, {} as any)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
