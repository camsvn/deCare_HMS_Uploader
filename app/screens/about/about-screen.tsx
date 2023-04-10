import React, { FC, useState } from "react"
import { Linking, View } from "react-native"
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
import { color, spacing} from "../../theme"
import { NavigatorParamList } from "../../navigators"

import { useStores } from "../../models"
import * as settingScreenStyles from "./about-screen.style";
import { showMessage } from "react-native-flash-message"


export const AboutScreen: FC<StackScreenProps<NavigatorParamList, "about">> = observer(
  ({ navigation }) => {
    const phoneNumber = '+918086358930';
    const websiteUrl = 'https://www.decare.team';

    const handlePhonePress = () => {
      Linking.openURL(`tel:${phoneNumber}`);
    };

    const handleWebsitePress = () => {
      Linking.openURL(websiteUrl);
    };

    const goBack = () => {
      console.log("Handle Back Click")
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

    return (
      <View testID="SettingScreen" style={settingScreenStyles.FULL}>
        <Header
         leftIcon="arrowLeft"
         headerTx="common.header" 
         leftIconStyle={{zIndex: 1, top:21}}
         leftIconSize={20}
         style={settingScreenStyles.HEADER} 
         titleStyle={settingScreenStyles.HEADER_TITLE}
         onLeftPress={goBack}
        />
        {/* <View style={settingScreenStyles.HEADER_VIEW}>
          <Button onPress={() => goBack()} preset="link" type="highlight">
            <Icon icon="back" width={30} height={30}/>
          </Button>
        </View> */}
        <Screen style={settingScreenStyles.CONTAINER} backgroundColor={color.transparent} preset="scroll">
          <View style={settingScreenStyles.MAINVIEW_CONTAINER}>

            <Text style={[settingScreenStyles.PRIMARY_CONTENT, {marginTop: spacing[3]}]}>Terms of Sevice</Text>
            <Divider color={color.primary} />            
            <Text tx="aboutScreen.contentParaLicense" style={[settingScreenStyles.CONTENT, {marginTop: spacing[2]}]} />
            
            
            <Text style={settingScreenStyles.PRIMARY_CONTENT}>About Us</Text>
            <Divider color={color.primary} />
            <Text tx="aboutScreen.contentParaIntro" style={[settingScreenStyles.CONTENT, settingScreenStyles.MARGIN_BOTTOM, {marginTop: spacing[2]}]} />
            <Text tx="aboutScreen.contentParaTwo" style={[settingScreenStyles.CONTENT, settingScreenStyles.MARGIN_BOTTOM]} />
            <Text tx="aboutScreen.contentParaThree" style={[settingScreenStyles.CONTENT, settingScreenStyles.MARGIN_BOTTOM]} />
            {/* <Text tx="aboutScreen.contentParaFinale" style={[settingScreenStyles.CONTENT, settingScreenStyles.MARGIN_BOTTOM]} /> */}

            <Text style={settingScreenStyles.PRIMARY_CONTENT}>Contact Us</Text>
            <Divider color={color.primary} />            
            <Text tx="aboutScreen.contentParaFinale" style={[settingScreenStyles.CONTENT, {marginVertical: spacing[2]}]} />
            
            <Text style={settingScreenStyles.CONTENT}>
              call us at {' '}
              <Text text="+91 80863 58930" style={[settingScreenStyles.CONTENT, { textDecorationLine: 'underline' }]} onPress={handlePhonePress}/>
            </Text>
            <Text text="or" />
            <Text style={settingScreenStyles.CONTENT}>
              visit our {' '}
              <Text text="website (decare.team)" style={[settingScreenStyles.CONTENT, { textDecorationLine: 'underline' }]} onPress={handleWebsitePress}/>
            </Text>

            <Text tx="aboutScreen.contentParaCopyright" style={[settingScreenStyles.CONTENT, settingScreenStyles.CENTER, {fontStyle:"italic", marginTop: spacing[4], marginBottom: spacing[1]}]} />
          </View>
        </Screen>
      </View>
    )
  },
)