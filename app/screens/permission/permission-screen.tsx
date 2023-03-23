import React, { FC } from "react"
import { View, Linking } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Button,
  Screen,
  Text,
  Icon
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"

import { showMessage, hideMessage } from "react-native-flash-message"
import * as permissionScreenStyles from "./permission-screen.style";

const permissionDescription = `It looks like you have turned off permissions required for this feature. It can be enabled under Phone Settings > Apps > HMS > Permissions`

export const PermissionScreen: FC<StackScreenProps<NavigatorParamList, "permission">> = observer(
  ({ navigation }) => {

    const goBack = () => {
      if (navigation.canGoBack()) {
        navigation.goBack()
      }
      else{
        showMessage({
          message: `Can't go back`,
          type: "info",
          backgroundColor: color.dim,
          color: color.primary
        })
      }
    }

    const handlePermission = () => {
      Linking.openSettings()
    }

    return (
      <View testID="PermissionScreen" style={permissionScreenStyles.FULL}>
        <View style={[{position: "absolute", top: 20, zIndex: 1}]}>
          <Button onPress={() => goBack()} preset="link" type="highlight">
            <Icon icon="back" width={30} height={30}/>
          </Button>
        </View>
        <Screen style={permissionScreenStyles.CONTAINER} backgroundColor={color.transparent} preset="scroll">
          <View style={permissionScreenStyles.MAINVIEW_CONTAINER}>
            <Text style={permissionScreenStyles.TITLE}>Grant Permission to access Camera</Text>
            <Text style={[permissionScreenStyles.CONTENT, {marginTop: spacing[3]}]}>{permissionDescription}</Text>
            <Button type="highlight" text="Grant Permission" style={{marginTop: spacing[4], backgroundColor: color.errorRed}} textStyle={{fontSize:14}} onPress={handlePermission}/>
          </View>
        </Screen>
      </View>
    )
  },
)