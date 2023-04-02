import { userSessionModel } from "./userSession"

test("can be created", () => {
  const instance = userSessionModel.create({})

  expect(instance).toBeTruthy()
})
