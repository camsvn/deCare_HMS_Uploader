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

import BlankCanvasSvg from './BlankCanvasSvg'
import { useRenderCount } from "../../utils/hooks/useRenderCount"
import { useStores } from "../../models"
import { showMessage, hideMessage } from "react-native-flash-message"
import * as configureURLScreenStyles from "./configureURL-screen.style";

const installationURLImage = require("./installationurl.png")
const installationURLImage1 = require("./installationurl1.png")
const installationURLImage2 = require("./installationurl2.png")


export const ConfigureURLScreen: FC<StackScreenProps<RootNavigatorParamList, "configureURL">> = observer(
  ({ navigation }) => {

    const renderCount = useRenderCount();

    // const nextScreen = () => navigation.navigate("demo")

    const onSubmitOP = () => {
      return ''
    }

    return (
      <View testID="ServerSetupScreen" style={configureURLScreenStyles.FULL}>
        <Screen style={configureURLScreenStyles.CONTAINER} backgroundColor={color.transparent} preset="scroll">
          <View style={configureURLScreenStyles.MAINVIEW_CONTAINER}>
            <View style={configureURLScreenStyles.URLLOGOVIEW_CONTAINER}>
              <Image source={installationURLImage2} style={configureURLScreenStyles.URLLOGO}/>
            </View>
            <View style={configureURLScreenStyles.INFO_TEXT_CONTAINER}>
              <Text style={configureURLScreenStyles.TITLE}>
                Installation URL
              </Text>
              <Text style={[configureURLScreenStyles.CONTENT, configureURLScreenStyles.CENTER]}>
                Input server URL of your self-hosted DeCare-HMS installation.
              </Text>
              <TextField
                inputStyle={configureURLScreenStyles.URL_FIELD}
                radius={5}
                // value={item.description}
                // onChangeText={(text) => updateDescription(index, text)}
                // blurOnSubmit={false}
                preset="secondary"
                labelStyle={{color:color.palette.black}}
              />
              <Button style={configureURLScreenStyles.SUBMIT_BUTTON} onPress={() => console.log('Submit Button')}>
                <Text style={configureURLScreenStyles.TEXT}>Connect</Text>
            </Button>
            </View>
          </View>
        </Screen>
      </View>
    )
  },
)