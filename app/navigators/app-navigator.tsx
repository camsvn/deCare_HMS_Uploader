/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme, StatusBar, Permission } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
  HomeScreen,
  TomogramScreen,
  ConfigureURLScreen,
  LoginScreen,
  SettingScreen,
  PermissionScreen 
} from "../screens"
import { MyTabBar } from "./tabBar";
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import { color } from "../theme"
import FlashMessage from "react-native-flash-message";
import { useStores } from "../models";
import { observer } from "mobx-react-lite";


/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  home: undefined
  tomogram: {opid: number}
  login: undefined
  configureURL: undefined
  welcome: undefined
  demo: undefined
  demoList: undefined
  settings: undefined
  permission: {permissionNames: Array<string>, permissions: Array<Permission>}
}

export type TabNavigatorParamList = {
  Home: undefined
  Settings: undefined
}

export type RootNavigatorParamList = {
  configureURL: undefined
  login: undefined
  appHome: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()
const SettingsStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator<TabNavigatorParamList>();
const RootStack = createNativeStackNavigator<RootNavigatorParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: "slide_from_right",
      }}
      initialRouteName="home"
    >
      <Stack.Screen name="home" component={HomeScreen} options={{animation: "fade"}}/>
      <Stack.Screen name="tomogram" component={TomogramScreen} options={{animation: "fade"}} />
      <Stack.Screen name="permission" component={PermissionScreen} options={{animation: "fade"}} />
      {/* <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="demo" component={DemoScreen} />
      <Stack.Screen name="demoList" component={DemoListScreen} /> */}
    </Stack.Navigator>
  ) 
}

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SettingsRoot"    
    >
      <SettingsStack.Screen name="SettingsRoot" component={SettingScreen} />
      {/* <SettingsStack.Screen name="welcome" component={WelcomeScreen} />
      <SettingsStack.Screen name="demo" component={DemoScreen} />
      <SettingsStack.Screen name="demoList" component={DemoListScreen} /> */}
    </SettingsStack.Navigator>
  );
}

const AppRootTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
      tabBar={props => <MyTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={AppStack} />
      <Tab.Screen name="Settings" component={SettingsStackScreen} />
    </Tab.Navigator>
  )
}

interface AppRootStackProps {
  initialRoute?: keyof RootNavigatorParamList
}

function AppRootStack({initialRoute = "configureURL"}:AppRootStackProps) {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRoute}   
    >
      <RootStack.Screen name="configureURL" component={ConfigureURLScreen} />
      <RootStack.Screen name="login" component={LoginScreen} />
      <RootStack.Screen name="appHome" component={AppRootTab} />
    </RootStack.Navigator>
  );
}


interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {
  isSessionRestored: boolean
}

export const AppNavigator = observer((props: NavigationProps) => {
  const { appConfig } = useStores()
  const colorScheme = useColorScheme()
  useBackButtonHandler(canExit)
  
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <StatusBar backgroundColor={color.primary} />
      {props.isSessionRestored ? (
        <AppRootStack initialRoute="appHome" />
      ) : appConfig.configURL ? (
        <AppRootStack initialRoute="login" />
      ) : (
        <AppRootStack />
      )}
      <FlashMessage position="top" />
    </NavigationContainer>
  )
})

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["home", "login", "configureURL"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
