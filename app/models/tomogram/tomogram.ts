import { Instance, SnapshotOut, getEnv, types } from "mobx-state-tree"
import { unlinkTmpFiles } from "../../utils/common";
import { withApiState } from "../extensions";
import { TomogramApi } from "../../services/api/tomogram-api";
import { Api } from "../../services/api";

/**
 * Tomogram model.
 */
const TomogramModel = types.model("Tomogram", {
  id: types.identifierNumber,
  tomogram: types.string,
  description: types.optional(types.string, ''),
});

type TomogramType = Instance<typeof TomogramModel>
export interface Tomogram extends TomogramType {}
type TomogramSnapshotType = SnapshotOut<typeof TomogramModel>
export interface TomogramSnapshot extends TomogramSnapshotType {}
export const createTomogramDefaultModel = () => types.optional(TomogramModel, {})

/**
 * Store containing Tomograms
 */
export const TomogramStoreModel = types
  .model("TomogramStore")
  .props({
    tomograms: types.optional(types.array(TomogramModel), []),
  })
  .extend(withApiState)
  .views((self) => ({
    get api() {
      return getEnv(self).api as Api
    }
  }))
  .volatile(self => ({
    tomogramApi: new TomogramApi(self.api)
  }))
  .views((self) => ({
    get allTomograms() {
      return self.tomograms.map(tomogram => tomogram.tomogram)
    },
    getTomogram: (id: number) => {
      return self.tomograms.find(tomogram => tomogram.id === id)?.tomogram
    }
  }))
  .actions((self) => ({
    saveTomograms: (tomogramSnapshots: TomogramSnapshot[]) => {
      self.tomograms.replace(tomogramSnapshots)
    },
    addTomogram: (tomogram: string) => {
      // Generate unique id for each tomogram
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 10000);
      const padRandom = String(random).padStart(4, "0");
      const id = parseInt(`${timestamp}${padRandom}`.slice(-6));
      self.tomograms.push({id, tomogram})
    },
    removeTomogram(id: number) {
      const cachedTomogram = self.getTomogram(id)
      cachedTomogram.length && unlinkTmpFiles([cachedTomogram])
      const index = self.tomograms.findIndex(tomogram => tomogram.id === id);
      if (index !== -1) {
        self.tomograms.splice(index, 1);
      }
    },
    updateTomogramDescription(id: number, description: string) {
      const tomogram = self.tomograms.find(tomogram => tomogram.id === id);
      if (tomogram) {
        tomogram.description = description;
      }
    },
    removeAllTomograms: async () => {
      const cachedTomograms = self.allTomograms
      self.tomograms.clear()
      cachedTomograms.length && await unlinkTmpFiles(cachedTomograms)
    }
  }))
  .actions((self) => ({
    uploadTomograms: async function (opid: number, overrideLoadingState: boolean, callback: (err: any) => void) {
      self._setLoading(true)
      const result = await self.tomogramApi.uploadTomograms(opid, self.tomograms)
      !overrideLoadingState && self._setLoading(false)
      if (result.kind === "ok") {
        if (overrideLoadingState) {
          callback(null)
          return
        }
        self.removeAllTomograms()
        callback(null)
      } else {
        overrideLoadingState && self._setLoading(false)
        callback(result.kind)
        __DEV__ && console.tron.log(result.kind)
      }
    }
  }))

type TomogramStoreType = Instance<typeof TomogramStoreModel>
export interface TomogramStore extends TomogramStoreType {}
type TomogramStoreSnapshotType = SnapshotOut<typeof TomogramStoreModel>
export interface TomogramStoreSnapshot extends TomogramStoreSnapshotType {}
export const createTomogramStoreDefaultModel = () => types.optional(TomogramStoreModel, {})