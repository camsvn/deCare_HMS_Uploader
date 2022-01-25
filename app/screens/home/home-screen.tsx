import React, { FC } from "react"
import { View, ViewStyle, TextStyle, SafeAreaView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Button,
  Header,
  Screen,
  Text,
  TextField,
  Icon,
  HideWithKeyboard,
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"

import BlankCanvas from './BlankCanvas'

const FULL: ViewStyle = { flex: 1, backgroundColor: color.background }
const CONTAINER: ViewStyle = {
  // backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const CENTER: TextStyle = {textAlign: "center"}
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[3] + spacing[1],
  paddingHorizontal: 0,
  backgroundColor: color.primary,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  // lineHeight: 38,
  textAlign: "center",
  letterSpacing: 1.5
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  color: color.text,
  fontSize: 20,
  lineHeight: 38
}
const CONTENT: TextStyle = {
  ...TEXT,
  color: color.dimText,
  fontSize: 15,
  lineHeight: 22
}
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}
const NO_PATIENT_CONTAINER: ViewStyle = { flex: 1, justifyContent: "center" }
const INFO_IMAGE_CONTAINER: ViewStyle = { width: '85%', alignSelf: 'center' }
const INFO_TEXT_CONTAINER: ViewStyle = { 
  marginHorizontal: spacing[5],
  alignItems: 'center'
}
const OP_FORM: ViewStyle = { flexDirection: "row", marginBottom: spacing[2] }
const SEARCH_INPUT_WRAPPER: ViewStyle = { flex: 1 }
const SEARCH_INPUT: TextStyle = {
  borderWidth: 0.1,
  borderRadius: 50,
  borderColor: '#707070',
  letterSpacing: 0.5,
  paddingLeft: spacing[4],
  elevation: 3
}
const SUBMIT_BUTTON: ViewStyle = {
  marginLeft: spacing[2],
  width: 53,
  borderRadius: 30,
  borderWidth: 0.1,
  borderColor: '#707070',
  backgroundColor: color.goGreen,  
  elevation: 3
}

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {

    const nextScreen = () => navigation.navigate("demo")

    return (
      <>
      <View testID="WelcomeScreen" style={FULL}>
        <Header
         leftIcon="cloudSync"
         rightIcon="checkMark" 
         headerTx="common.header" 
         style={HEADER} 
         titleStyle={HEADER_TITLE} 
         onLeftPress={()=>console.log("Header Left Pressed")}
         onRightPress={()=>console.log("Header Right Pressed")}
        />
        <Screen style={CONTAINER} backgroundColor={color.transparent} preset="fixed">
          <View style={NO_PATIENT_CONTAINER}>
            <HideWithKeyboard>
              <View style={INFO_IMAGE_CONTAINER}>
                <BlankCanvas />
              </View>
            </HideWithKeyboard>
            <View style={INFO_TEXT_CONTAINER}>
              <Text style={TITLE}>
                There is no patient selected.
              </Text>
              <Text style={[CONTENT, CENTER]}>
                Once you choose a patient, they'll appear here.
              </Text>
            </View>
          </View>
          <View style={OP_FORM}>
            <TextField
             blurWithoutKeyboard
             style={SEARCH_INPUT_WRAPPER}
             inputStyle={SEARCH_INPUT}
             placeholder="Enter OP Number" 
             keyboardType="numeric" 
             returnKeyType="search"
             maxLength={7}
            />
            <Button style={SUBMIT_BUTTON}>
              <Icon icon="checkMark" fillColor={color.palette.mirage}/>
            </Button>
           </View>
          {/* <Text style={TITLE_WRAPPER}>
            <Text style={TITLE} text="Your new app2, Amal " />
            <Text style={ALMOST} text="almost" />
            <Text style={TITLE} text="!" />
          </Text>
          <Text style={TITLE} preset="header" tx="welcomeScreen.readyForLaunch" />
          <Text style={CONTENT}>
            This probably isn't what your app is going to look like. Unless your designer handed you
            this screen and, in that case, congrats! You're ready to ship.
          </Text>
          <Text style={CONTENT}>
            For everyone else, this is where you'll see a live preview of your fully functioning app
            using Ignite.
          </Text> */}
        </Screen>
        <HideWithKeyboard>
          <SafeAreaView style={FOOTER}>
            <View style={FOOTER_CONTENT}>
              <Button
                testID="next-screen-button"
                style={CONTINUE}
                textStyle={CONTINUE_TEXT}
                tx="welcomeScreen.continue"
                onPress={nextScreen}
              />
            </View>
          </SafeAreaView>
        </HideWithKeyboard>
      </View>
      </>
    )
  },
)
