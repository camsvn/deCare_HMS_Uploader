import { TomogramStoreModel } from "./tomogram"

test("can be created", () => {
  const instance = TomogramStoreModel.create({})

  expect(instance).toBeTruthy()
})
