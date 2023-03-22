import React, { FC, useState } from "react"
import { View, ViewStyle, TextStyle, SafeAreaView, TextInputProps } from "react-native"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Button,
  Header,
  Screen,
  Text,
  TextField,
  SearchTextField,
  Icon,
  HideWithKeyboard,
  AutoImage as Image
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList, RootNavigatorParamList } from "../../navigators"

import LogoSvg from './LogoSvg'
import { useRenderCount } from "../../utils/hooks/useRenderCount"
import { useStores } from "../../models"
import { showMessage, hideMessage } from "react-native-flash-message"
import * as configureURLScreenStyles from "./login-screen.style";

// const installationURLImage = require("./installationurl.png")
// const installationURLImage1 = require("./installationurl1.png")
// const installationURLImage2 = require("./installationurl2.png")



export const LoginScreen: FC<StackScreenProps<RootNavigatorParamList, "login">> = observer(
  ({ navigation }) => {

    const renderCount = useRenderCount();

    // const nextScreen = () => navigation.navigate("demo")

    const onSubmitOP = () => {
      return ''
    }

    return (
      <View testID="LoginScreen" style={configureURLScreenStyles.FULL}>
        <Screen style={configureURLScreenStyles.CONTAINER} backgroundColor={color.transparent} preset="scroll">
          <View style={configureURLScreenStyles.MAINVIEW_CONTAINER}>
            <View style={configureURLScreenStyles.URLLOGOVIEW_CONTAINER}>
              <View style={{width: 60, height:60,}}>
                <LogoSvg/>
              </View>
              <Text style={[configureURLScreenStyles.TITLE, {marginLeft: spacing[2], fontFamily: typography.secondary}]}>DeCare HMS</Text>
              {/* <Image source={LogoSvg} style={configureURLScreenStyles.URLLOGO}/> */}
            </View>
            <View style={[configureURLScreenStyles.INFO_TEXT_CONTAINER, {flex: 1.25}]}>
              <TextField
                inputStyle={configureURLScreenStyles.URL_FIELD}
                radius={5}
                label="Email"
                // value={item.description}
                // onChangeText={(text) => updateDescription(index, text)}
                // blurOnSubmit={false}
                preset="secondary"
                labelStyle={{color:color.palette.black}}
              />
              <TextField
                inputStyle={configureURLScreenStyles.URL_FIELD}
                radius={5}
                label="Password"
                // keyboardType="visible-password"
                secureTextEntry={true}
                // rightIcon="camera"
                // value={item.description}
                // onChangeText={(text) => updateDescription(index, text)}
                // blurOnSubmit={false}
                preset="secondary"
                labelStyle={{color:color.palette.black}}
              />
              <Button style={configureURLScreenStyles.SUBMIT_BUTTON} onPress={() => console.log('Submit Button')}>
                <Text style={configureURLScreenStyles.TEXT}>Sign In</Text>
            </Button>
            </View>
          </View>
        </Screen>
      </View>
    )
  },
)