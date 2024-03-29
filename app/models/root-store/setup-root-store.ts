import { onSnapshot } from "mobx-state-tree"
import { RootStoreModel, RootStore } from "./root-store"
import { Environment } from "../environment"
import * as storage from "../../utils/storage"

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = "root"

/**
 * Setup the environment that all the models will be sharing.
 *
 * The environment includes other functions that will be picked from some
 * of the models that get created later. This is how we loosly couple things
 * like events between models.
 */
export async function createEnvironment(url: string | undefined = undefined) {
  const env = new Environment(url)
  await env.setup()
  return env
}

/**
 * Setup the root state.
 */
export async function setupRootStore(url: string = undefined) {
  let rootStore: RootStore
  let data: any
  let env: Environment

  // prepare the environment that will be associated with the RootStore.
  // const env = await createEnvironment(url)
  env = await createEnvironment(url)

  try {
    // load data from storage
    data = (await storage.load(ROOT_STATE_STORAGE_KEY)) || {}

    // recompute and override the environment if url restored from storage
    const storeUrl = data.appConfig.configURL.length && data.appConfig.configURL
    url = url || storeUrl
    env = await createEnvironment(url)

    rootStore = RootStoreModel.create(data, env)
  } catch (e) {
    // if there's any problems loading, then let's at least fallback to an empty state
    // instead of crashing.
    rootStore = RootStoreModel.create({}, env)

    // but please inform us what happened
    __DEV__ && console.tron.error(e.message, null)
  }

  // reactotron logging
  if (__DEV__) {
    env.reactotron.setRootStore(rootStore, data)
  }

  // track changes & save to storage
  onSnapshot(rootStore, (snapshot) => storage.save(ROOT_STATE_STORAGE_KEY, snapshot))

  return rootStore
}
