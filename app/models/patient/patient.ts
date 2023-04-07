import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { PatientApi } from "../../services/api/opregister-api"
import { withApiState, withEnvironment, withRootStore } from "../extensions"

/**
 * DeCare Patient Model
 */
export const PatientModel = types.model("Patient").props({
  id: types.maybe(types.number),
  opid: types.maybe(types.number),
  name: types.maybe(types.string)
})
.extend(withEnvironment)
.extend(withApiState)
.extend(withRootStore)
.actions((self) => ({
  setPatient: flow(function* (patient) {
    self.id = patient.id
    self.opid = patient.opid
    self.name = patient.name
    self.rootStore.recentSearchesStore.addPatient(patient)
  }),
}))
.actions((self) => ({
  getPatient: async (opid: number, callback: (err: any) => void) => {
    self._setLoading(true)
    const patientApi = new PatientApi(self.environment.api)
    const result = await patientApi.getOpById(opid)
    self._setLoading(false)
    if (result.kind === "ok") {
      self.setPatient(result.patient)
      callback(null)
    } else {
      callback(result.kind)
      __DEV__ && console.tron.log(result.kind)
    }
  },
}))

type PatientType = Instance<typeof PatientModel>
export interface Patient extends PatientType {}
type PatientSnapshotType = SnapshotOut<typeof PatientModel>
export interface PatientSnapshot extends PatientSnapshotType {}
export const createPatientDefaultModel = () => types.optional(PatientModel, {})
