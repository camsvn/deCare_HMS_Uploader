import { PatientModel } from "./recentSearch"

test("can be created", () => {
  const instance = PatientModel.create({
    id: 1,
    opid: 1,
    name: "Suma",
  })

  expect(instance).toBeTruthy()
})
