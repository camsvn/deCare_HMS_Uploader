import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { unlinkTmpFiles } from "../../utils/common";

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
interface TomogramSnapshot extends TomogramSnapshotType {}
export const createTomogramDefaultModel = () => types.optional(TomogramModel, {})

/**
 * Store containing Tomograms
 */
export const TomogramStoreModel = types
  .model("TomogramStore")
  .props({
    tomograms: types.optional(types.array(TomogramModel), []),
  })
  .views((self) => ({
    get allTomograms() {
      return self.tomograms.map(tomogram => tomogram.tomogram)
    },
    getTomogramById: (id: number) => {
      return self.tomograms.find(tomogram => tomogram.id === id)?.tomogram
    }
  }))
  .actions((self) => ({
    saveTomograms: (tomogramSnapshots: TomogramSnapshot[]) => {
      self.tomograms.replace(tomogramSnapshots)
    },
    addTomogram: (tomogram: string) => {
      const tomogramSnapshot =  TomogramModel.create({tomogram})
      self.tomograms.push(tomogramSnapshot)
    },
    removeTomogram(id: number) {
      const tomogram = self.getTomogramById(id)
      unlinkTmpFiles([tomogram])
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
    clearTomograms: () => {
      const tomograms = self.allTomograms
      unlinkTmpFiles(tomograms)
      self.tomograms.clear()
    }
  }))

type TomogramStoreType = Instance<typeof TomogramStoreModel>
export interface TomogramStore extends TomogramStoreType {}
type TomogramStoreSnapshotType = SnapshotOut<typeof TomogramStoreModel>
export interface TomogramStoreSnapshot extends TomogramStoreSnapshotType {}
export const createTomogramStoreDefaultModel = () => types.optional(TomogramStoreModel, {})