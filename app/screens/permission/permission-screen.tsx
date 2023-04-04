/* eslint-disable react-native/split-platform-components */
import React, { FC, useEffect, useState } from "react"
import { View, Linking, PermissionsAndroid, AppState } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Button,
  Screen,
  Text,
  Icon
} from "../../components"
import { color, spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"

import { showMessage } from "react-native-flash-message"
import * as permissionScreenStyles from "./permission-screen.style";


const permissionDescription = `It looks like you have turned off permissions required for this feature. It can be enabled under Phone Settings > Apps > HMS > Permissions`

export const PermissionScreen: FC<StackScreenProps<NavigatorParamList, "permission">> = observer(
  ({ navigation, route }) => {

    const {permissionNames, permissions} = route.params

    const [permissionName, setPermissionName] = useState('')

    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        console.log("AppState is in Foreground")
        checkPermission();
        getTitle();
      }
    };

    useEffect(() => {
      (async () => {
        await getTitle()
      })()
      const subscription = AppState.addEventListener('change', handleAppStateChange);
      return () => {
        subscription.remove()
      };
    }, []);

    const getGrantedArr = async () => {
      const grantedArr = await Promise.all(
        permissions.map(async (permission) => {
          const isGranted = await PermissionsAndroid.check(permission);
          return isGranted;
        })
      );
      return grantedArr;
    }

    const checkPermission = async () => {
      const grantedArr = await getGrantedArr()    
      const granted = grantedArr.every((isGranted) => isGranted);
    
      if (granted) {
        goBack();
      }
    }    

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

    const getTitle = async () => {
      let index = -1
      const grantedArr = await getGrantedArr()

      for (let i = 0; i < grantedArr.length; i++) {
        const isGranted = grantedArr[i]
        if(isGranted === false) {
          index = i
          break
        }
      }

      if (index !== -1) {
        setPermissionName(permissionNames[index])
      }  
    }
    

    return (
      <View testID="PermissionScreen" style={permissionScreenStyles.FULL}>
        <View style={permissionScreenStyles.HEADER_VIEW}>
          <Button onPress={() => goBack()} preset="link" type="highlight">
            <Icon icon="back" width={30} height={30}/>
          </Button>
        </View>
        <Screen style={permissionScreenStyles.CONTAINER} backgroundColor={color.transparent} preset="scroll">
          <View style={permissionScreenStyles.MAINVIEW_CONTAINER}>
            <Text style={permissionScreenStyles.TITLE}>{`Grant Permission to access ${permissionName}`}</Text>
            <Text style={[permissionScreenStyles.CONTENT, {marginTop: spacing[3]}]}>{permissionDescription}</Text>
            <Button type="highlight" text="Grant Permission" style={{marginTop: spacing[4], backgroundColor: color.errorRed}} textStyle={permissionScreenStyles.CONTENT_TEXT} onPress={handlePermission}/>
          </View>
        </Screen>
      </View>
    )
  },
)