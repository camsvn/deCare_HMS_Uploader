import { Instance, SnapshotOut, types } from "mobx-state-tree"
// import { CharacterModel, CharacterSnapshot } from "../character/character"
// import { PatientModel, PatientSnapshot, Patient } from "../patient/patient"
// import { CharacterApi } from "../../services/api/character-api"
import { PatientApi } from "../../services/api/opregister-api"
import { withEnvironment } from "../extensions/with-environment"
/**
 * DeCare Patient Model
 */
export const PatientModel = types.model("Patient").props({
  id: types.maybe(types.string),
  opid: types.maybe(types.string),
  name: types.maybe(types.string),
  loading: types.optional(types.boolean, false)
})
.extend(withEnvironment)
// .actions((self) => ({
//   saveCharacters: (characterSnapshots: PatientSnapshot[]) => {
//     console.log(self.name)
//   },
// }))
.actions((self) => ({
  setPatient(patient) {
    self.id = String(patient.id)
    self.opid = String(patient.opid)
    self.name = patient.name
  }
}))
.actions((self) => ({
  getPatient: async (opid: string, callback: (err: any) => void) => {
    self.loading = true
    const patientApi = new PatientApi(self.environment.api)
    const result = await patientApi.getOpById(opid)
    console.log("Amal", result)
    self.loading = false
    if (result.kind === "ok") {
      // self.saveCharacters(result.patient)
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
