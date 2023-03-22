import React, { FC, useState } from "react"
import { View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Button,
  Header,
  Screen,
  Text,
  TextField,
  Divider,
  Icon
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"

import LogoSvg from './LogoSvg'
import { useRenderCount } from "../../utils/hooks/useRenderCount"
import { useStores } from "../../models"
import { showMessage, hideMessage } from "react-native-flash-message"
import * as loginScreenStyles from "./settings-screen.style";
import { l } from "i18n-js"



export const SettingScreen: FC<StackScreenProps<NavigatorParamList, "settings">> = observer(
  ({ navigation }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => setShowPassword(!showPassword);

    return (
      <View testID="SettingScreen" style={loginScreenStyles.FULL}>
        <Header
        //  leftIcon="cloudSync"
        //  rightIcon="checkMark" 
        //  leftIconSize={26}
        //  rightIconSize={24}
         headerTx="common.header" 
         style={loginScreenStyles.HEADER} 
         titleStyle={loginScreenStyles.HEADER_TITLE} 
         onLeftPress={()=>console.log("Header Left Pressed")}
         onRightPress={()=>console.log("Header Right Pressed")}
        />
        <Screen style={loginScreenStyles.CONTAINER} backgroundColor={color.transparent} preset="scroll">
          <View style={loginScreenStyles.MAINVIEW_CONTAINER}>
            <Button type="opacity" preset="link" 
              style={[{paddingHorizontal: 0, flexDirection: "row", alignItems: "center"}]} 
            >
              <View style={[{paddingVertical: spacing[4], flex: 1}]}>
                {/* <Text style={[{fontSize: 18, paddingVertical: spacing[4], flex: 1}]}>Change InstallationURL</Text> */}
                <Text style={[{fontSize: 18}]}>Change InstallationURL</Text>
                <Text style={[loginScreenStyles.CONTENT]}>Re-configure the connection URL of your self-hosted DeCare HMS. This process will log you out of the app.</Text>
              </View>
              <Icon icon="arrow" containerStyle={{ transform: [{ rotate: '90deg' }] }} fillColor={color.primary}/>
            </Button>

            <Divider color={color.primary} />

            <Button type="opacity" preset="link" 
              style={[{paddingHorizontal: 0, flexDirection: "row", alignItems: "center"}]} 
            >
              <Text style={[{fontSize: 18, paddingVertical: spacing[4], flex: 1}]}>About</Text>
              <Icon icon="arrow" containerStyle={{ transform: [{ rotate: '90deg' }] }} fillColor={color.primary}/>
            </Button>

            <Divider color={color.primary}/>

            <Button type="opacity" preset="link" 
              style={[{paddingHorizontal: 0, flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}]} 
            >
              <Text style={[{fontSize: 18, paddingVertical: spacing[4]}]}>Logout</Text>
              <Icon icon="logout" containerStyle={{ transform: [{ rotate: '180deg' }], marginLeft: 5 }} fillColor={color.errorRed}/>
            </Button>
          </View>
        </Screen>
      </View>
    )
  },
)