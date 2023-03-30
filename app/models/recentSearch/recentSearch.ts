import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { PatientModel, Patient } from "../patient/patient";

/**
 * Recent Patient Searches Model
 */
export const RecentSearchesModel = types.model("RecentSearches").props({
  searches: types.array(types.late(() => PatientModel))
})
.actions((self) => ({
  deletePatientIfExist: (id: number) => {
    const index = self.searches.findIndex((p) => p.id === id);
    if (index !== -1) {
      self.searches.splice(index, 1);
    }
  },
  clearAll() {
    self.searches.clear()
  }
}))
.actions((self) => ({
  addPatient: (patient: Patient) => {    
    self.deletePatientIfExist(patient.id)
    self.searches.unshift(patient)   
    // Cap the list at 10
    if (self.searches.length > 10) {
      self.searches.pop()
    }
  }
}))

type RecentSearchesType = Instance<typeof RecentSearchesModel>
export interface RecentSearches extends RecentSearchesType {}
type RecentSearchesSnapshotType = SnapshotOut<typeof RecentSearchesModel>
export interface RecentSearchesSnapshot extends RecentSearchesSnapshotType {}
export const createPatientDefaultModel = () => types.optional(RecentSearchesModel, {})