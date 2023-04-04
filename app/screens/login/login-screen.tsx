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
import { useStores } from "../../models"
import { showMessage } from "react-native-flash-message"
import * as loginScreenStyles from "./login-screen.style";



export const LoginScreen: FC<StackScreenProps<RootNavigatorParamList, "login">> = observer(
  ({ navigation }) => {

    const {userSession} = useStores()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => setShowPassword(!showPassword);

    const handleLogin = () => {
      userSession.fetchTokens(username, password, (err) => {
        if (!err) {
          setUsername('')
          setPassword('')
          navigation.navigate("appHome");
          return
        }
        showMessage({
          message: `Login: ${err}`,
          type: "danger"
        })
      })
    }

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
                containerStyle={loginScreenStyles.TEXT_FIELD_WRAPPER}
                inputStyle={loginScreenStyles.TEXT_FIELD}
                radius={5}
                label="Username"
                value={username}
                onChangeText={setUsername}
                preset="secondary"
                labelStyle={{color:color.palette.black}}
              />
              <TextField
                containerStyle={loginScreenStyles.TEXT_FIELD_WRAPPER}
                inputStyle={loginScreenStyles.TEXT_FIELD}
                radius={5}
                label="Password"
                secureTextEntry={!showPassword}
                rightIcon={showPassword ? "eyePassswordShow" : "eyePassswordHide"}
                iconSize={22}
                onRightPress={toggleShowPassword}
                value={password}
                onChangeText={setPassword}
                preset="secondary"
                labelStyle={{color:color.palette.black}}
                iconStyle={loginScreenStyles.SHOW_PASSWORD_ICON}
              />
              <Button style={loginScreenStyles.SUBMIT_BUTTON} onPress={handleLogin}>
                <Text style={loginScreenStyles.TEXT}>Sign In</Text>
              </Button>
              <Button 
                text="| Change URL |" 
                preset="link"
                onPress={() => navigation.navigate("configureURL")} 
                textStyle={loginScreenStyles.CONFIG_URL_LINK}/>
            </View>
          </View>
        </Screen>
      </View>
    )
  },
)