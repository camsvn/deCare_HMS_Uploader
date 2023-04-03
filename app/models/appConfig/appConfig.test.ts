import { AppConfigModel } from "./appConfig"

test("can be created", () => {
  const instance = AppConfigModel.create({
  })

  expect(instance).toBeTruthy()
})
