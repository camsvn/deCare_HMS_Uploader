/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./i18n"
import "./utils/ignore-warnings"
import React, { useState, useEffect } from "react"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import { initFonts } from "./theme/fonts" // expo
import * as storage from "./utils/storage"
import { AppNavigator, useNavigationPersistence } from "./navigators"
import { RootStore, RootStoreProvider, setupRootStore } from "./models"
import { ToggleStorybook } from "../storybook/toggle-storybook"
import { ErrorBoundary } from "./screens/error/error-boundary"
import { View, Text, StatusBar, ViewStyle, TextStyle } from "react-native"
import { Buffer } from 'buffer';
import {AutoImage as Image} from './components/'
import { color, typography } from "./theme"
const hmsLogo = require("../assets/images/drawable-xxhdpi/hms_square.png")

const SPLASH_SCREEN_WRAPPER: ViewStyle = {
  backgroundColor: '#16142a', 
  flex: 1, 
  justifyContent: "center", 
  alignItems: "center"
}

const SPLASH_SCREEN_LOGO_TEXT: TextStyle =  {
  fontFamily: typography.primary, 
  color: color.dimText, 
  fontSize: 32, 
  fontWeight: "700", 
  letterSpacing: 2
}

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

/**
 * This is the root component of our app.
 */
function App() {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)
  const [isSessionRestored, setSessionRestored] = useState<boolean>(false)
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    function restoreSession(store: RootStore) {
      const refreshToken = store?.userSession.refreshToken

      if(!refreshToken) {
        // console.log("No Refresh Token Found")
        return
      }

      // console.log("Refresh Token Found")
      const base64Url = refreshToken.split('.')[1]; // Extract the payload of the token
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL-safe characters
      // const payload = JSON.parse(window.atob(base64)); // Decode the payload and parse the JSON string
      const payload = JSON.parse(Buffer.from(base64, 'base64').toString('ascii')); // Decode the payload and parse the JSON string

      const exp = payload.exp; // Extract the expiration time from the payload

      const isTokenValid = exp > (Date.now() / 1000); // Check if expiration time is greater than current Unix timestamp

      if (!isTokenValid) {
        setSessionRestored(false)
        return
      }
      setSessionRestored(true)
    }

    // initialize the RootStore and set the state when the component mounts
    ;(async () => {
      await initFonts() // expo
      setupRootStore().then((store) => {
        restoreSession(store)
        setRootStore(store)
      })
    })()
    
    // initialize the RootStore and set the state when the component mounts
    // const initialize = async () => {
    //   await initFonts() // expo
    //   const store = await setupRootStore()
    //   setRootStore(store)
    // }
    // initialize()
  }, [])



  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!rootStore || !isNavigationStateRestored) return (
    <View style={SPLASH_SCREEN_WRAPPER}>
        <StatusBar backgroundColor= '#16142a' />
        <Image source={hmsLogo} />
        <Text style={SPLASH_SCREEN_LOGO_TEXT}>DeCare HMS</Text>
      </View>
  )

  // otherwise, we're ready to render the app
  return (
    <ToggleStorybook>
      <RootStoreProvider value={rootStore}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <ErrorBoundary catchErrors={"always"}>
            <AppNavigator
              isSessionRestored = {isSessionRestored}
              initialState={initialNavigationState}
              onStateChange={onNavigationStateChange}
            />
          </ErrorBoundary>
        </SafeAreaProvider>
      </RootStoreProvider>
    </ToggleStorybook>
  )
}

export default App
