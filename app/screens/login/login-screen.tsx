import React, { FC, useState } from "react"
import { View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Button,
  Screen,
  Text,
  TextField,
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { RootNavigatorParamList } from "../../navigators"

import LogoSvg from './LogoSvg'
import { useRenderCount } from "../../utils/hooks/useRenderCount"
import { useStores } from "../../models"
import { showMessage, hideMessage } from "react-native-flash-message"
import * as loginScreenStyles from "./login-screen.style";



export const LoginScreen: FC<StackScreenProps<RootNavigatorParamList, "login">> = observer(
  ({ navigation }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => setShowPassword(!showPassword);

    return (
      <View testID="LoginScreen" style={loginScreenStyles.FULL}>
        <Screen style={loginScreenStyles.CONTAINER} backgroundColor={color.transparent} preset="scroll">
          <View style={loginScreenStyles.MAINVIEW_CONTAINER}>
            <View style={loginScreenStyles.LOGOVIEW_CONTAINER}>
              <View style={loginScreenStyles.LOGO_CONTAINER}>
                <LogoSvg/>
              </View>
              <Text style={[loginScreenStyles.TITLE, {marginLeft: spacing[2], fontFamily: typography.secondary}]}>DeCare HMS</Text>
              {/* <Image source={LogoSvg} style={loginScreenStyles.URLLOGO}/> */}
            </View>
            <View style={loginScreenStyles.FORM_CONTAINER}>
              <TextField
                inputStyle={loginScreenStyles.TEXT_FIELD}
                radius={5}
                label="Username"
                value={username}
                onChangeText={setUsername}
                preset="secondary"
                labelStyle={{color:color.palette.black}}
              />
              <TextField
                inputStyle={loginScreenStyles.TEXT_FIELD}
                radius={5}
                label="Password"
                secureTextEntry={!showPassword}
                // rightIcon="camera"
                value={password}
                onChangeText={setPassword}
                preset="secondary"
                labelStyle={{color:color.palette.black}}
              />
              <Button style={loginScreenStyles.SUBMIT_BUTTON} onPress={() => console.log('Submit Button')}>
                <Text style={loginScreenStyles.TEXT}>Sign In</Text>
            </Button>
            </View>
          </View>
        </Screen>
      </View>
    )
  },
)