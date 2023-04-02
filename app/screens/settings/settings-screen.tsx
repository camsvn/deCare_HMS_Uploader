import React, { FC } from "react"
import { View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Button,
  Header,
  Screen,
  Text,
  Divider,
  Icon
} from "../../components"
import { color} from "../../theme"
import { NavigatorParamList } from "../../navigators"

import { useStores } from "../../models"
import { showMessage, hideMessage } from "react-native-flash-message"
import * as settingScreenStyles from "./settings-screen.style";



export const SettingScreen: FC<StackScreenProps<NavigatorParamList, "settings">> = observer(
  ({ navigation }) => {

    const {userSession} = useStores()

    const handleLogout = () => {
      userSession.clear()
      console.log("Trying to logout")
      navigation.navigate("login")
    }

    const handleChangeURL = () => {
      userSession.clear()
      console.log("Switch to Change URL Screen")
      navigation.navigate("configureURL")
    }

    return (
      <View testID="SettingScreen" style={settingScreenStyles.FULL}>
        <Header
         headerTx="common.header" 
         style={settingScreenStyles.HEADER} 
         titleStyle={settingScreenStyles.HEADER_TITLE} 
         onLeftPress={()=>console.log("Header Left Pressed")}
         onRightPress={()=>console.log("Header Right Pressed")}
        />
        <Screen style={settingScreenStyles.CONTAINER} backgroundColor={color.transparent} preset="scroll">
          <View style={settingScreenStyles.MAINVIEW_CONTAINER}>
            <Button type="opacity" preset="link" 
              style={settingScreenStyles.BUTTON_CONTAINER} 
              onPress={handleChangeURL}
            >
              <View style={settingScreenStyles.BUTTON_SPACING_CONTENT}>
                <Text style={settingScreenStyles.PRIMARY_CONTENT}>Change InstallationURL</Text>
                <Text style={settingScreenStyles.CONTENT}>Re-configure the connection URL of your self-hosted DeCare HMS. This process will log you out of the app.</Text>
              </View>
              <Icon icon="arrow" containerStyle={{ transform: [{ rotate: '90deg' }] }} fillColor={color.primary}/>
            </Button>

            <Divider color={color.primary} />

            <Button type="opacity" preset="link" 
              style={settingScreenStyles.BUTTON_CONTAINER} 
            >
              <Text style={[settingScreenStyles.PRIMARY_CONTENT, settingScreenStyles.BUTTON_SPACING_CONTENT]}>About</Text>
              <Icon icon="arrow" containerStyle={{ transform: [{ rotate: '90deg' }] }} fillColor={color.primary}/>
            </Button>

            <Divider color={color.primary}/>

            <Button type="opacity" preset="link" 
              style={settingScreenStyles.LOGOUT_BUTTON_CONTAINER} 
              onPress={handleLogout}
            >
              <Text style={[settingScreenStyles.PRIMARY_CONTENT ,settingScreenStyles.LOGOUT_TEXT]}>Logout</Text>
              <Icon icon="logout" containerStyle={ settingScreenStyles.LOGOUT_ICON } fillColor={color.errorRed}/>
            </Button>
          </View>
        </Screen>
      </View>
    )
  },
)