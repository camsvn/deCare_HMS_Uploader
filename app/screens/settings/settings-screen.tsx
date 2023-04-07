import React, { FC, useState } from "react"
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
import * as settingScreenStyles from "./settings-screen.style";
import { Modal } from "../../components/modal/modal"



export const SettingScreen: FC<StackScreenProps<NavigatorParamList, "settings">> = observer(
  ({ navigation }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalConfirmFunction, setModalConfirmFunction] = useState(null);

    const {userSession, appConfig} = useStores()

    const handleLogout = () => {
      userSession.clear()
      setIsModalVisible(false)
      navigation.navigate("login")
    }

    const handleChangeURL = () => {
      appConfig.reset()
      userSession.clear()
      navigation.navigate("configureURL")
    }

    const handleModalClick = (reference: () => void) => {
      setModalConfirmFunction(reference)
      setIsModalVisible(true)
    }

    return (
      <View testID="SettingScreen" style={settingScreenStyles.FULL}>
        <Header
         headerTx="common.header" 
         style={settingScreenStyles.HEADER} 
         titleStyle={settingScreenStyles.HEADER_TITLE}
        />
        <Screen style={settingScreenStyles.CONTAINER} backgroundColor={color.transparent} preset="scroll">
        <Modal visible={isModalVisible} onConfirm={() => modalConfirmFunction()} onCancel={() => setIsModalVisible(false)} />
          <View style={settingScreenStyles.MAINVIEW_CONTAINER}>
            <Button type="opacity" preset="link" 
              style={settingScreenStyles.BUTTON_CONTAINER} 
              onPress={() => handleModalClick(() => handleChangeURL)}
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
              // onPress={handleLogout}
              onPress={() => handleModalClick(() => handleLogout)}
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