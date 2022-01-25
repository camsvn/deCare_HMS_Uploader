import React, { FC, useEffect, useRef, useState } from "react"
import { View, ViewStyle, TextStyle, ImageStyle, SafeAreaView, TextInput, Keyboard } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Button,
  Header,
  Screen,
  Text,
  GradientBackground,
  TextField,
  Icon
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import HideWithKeyboard from 'react-native-hide-with-keyboard'

import BlankCanvas from './BlankCanvas'

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
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
  // paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
  backgroundColor: color.primary,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
  // borderWidth: 2,
  // borderColor: 'red'
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  // lineHeight: 38,
  textAlign: "center",
  letterSpacing: 1.5,
  // borderWidth: 2,
  // borderColor: 'green'
}
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  // textAlign: "center",
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  color: color.text,
  fontSize: 20,
  lineHeight: 38,
  // textAlign: "center",
}
const ALMOST: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 26,
  fontStyle: "italic",
}
const BOWSER: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
  width: 343,
  height: 230,
}
const CONTENT: TextStyle = {
  ...TEXT,
  color: color.dimText,
  fontSize: 15,
  lineHeight: 22,
  // marginBottom: spacing[5],
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
const BORDERTEST: ViewStyle = {
  flex: 1,
  borderColor: 'red',
  borderWidth: 2,
  alignSelf: 'center',
}

const INFO_IMAGE_CONTAINER: ViewStyle = {
  // height: 150,
  flex: 1,
  // borderWidth: 2,
  // borderColor: 'red',
  justifyContent: "center"
}

const INFO_TEXT_CONTAINER: ViewStyle = {
  marginHorizontal: spacing[5],
  alignItems: 'center'
}

const OP_FORM: ViewStyle = {
  flexDirection: "row",
  marginBottom: spacing[2]
}

const SEARCH_INPUT_WRAPPER: ViewStyle = {
  flex: 1
}

const SEARCH_INPUT: TextStyle = {
  borderWidth: 1,
  borderRadius: 50,
  borderColor: '#707070',
  letterSpacing: 0.5,
  paddingLeft: spacing[4]
}

const SUBMIT_BUTTON: ViewStyle = {
  marginLeft: spacing[2],
  width: 53,
  borderRadius: 30,
  backgroundColor: color.goGreen  
}


export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {
    // const searchField = useRef<TextInput>();
    // const [isKeyboardVisible, setKeyboardVisibilty] = useState(false);
    const nextScreen = () => navigation.navigate("demo")

    // useEffect(() => {
    //   const keyboardShowSub = Keyboard.addListener('keyboardDidShow', () => {
    //     // console.log('Keyboard Active');
    //     setKeyboardVisibilty(true);
    //   });
    //   const keyboardHideSub = Keyboard.addListener('keyboardDidHide', () => {
    //     // console.log('Keyboard Hide');
    //     setKeyboardVisibilty(false);
    //     // searchField.current.blur();
    //   });
    
    //   return () => {
    //     keyboardShowSub.remove();
    //     keyboardHideSub.remove();
    //   };
    // }, []);

    // useEffect(() => {
    //   if (!isKeyboardVisible) {
    //     // console.log("Amal keyboard is not Visible")
    //     // console.log(searchField.current) 
    //     searchField.current?.blur()    
    //   }
    // }, [isKeyboardVisible])
    

    return (
      <>
      {/* <View style={{height: 52, backgroundColor: '#151D28'}}>
        <Text style={[TITLE_WRAPPER, TITLE, BORDERTEST]} text="DeCare HMS 123"/>
      </View> */}
      <View testID="WelcomeScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Header
         leftIcon="cloudSync"
         rightIcon="checkMark" 
         headerTx="common.header" 
         style={HEADER} 
         titleStyle={HEADER_TITLE} 
         onLeftPress={()=>console.log("Header Left Pressed")}
         onRightPress={()=>console.log("Header Right Pressed")}
        />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.palette.white}>
          <View style={INFO_IMAGE_CONTAINER}>
            <HideWithKeyboard>
              <BlankCanvas />
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
          {/* <Text style={CONTENT}>
            For everyone else, this is where you'll see a live preview of your fully functioning app
            using Ignite.
          </Text> */}
          <View style={OP_FORM}>
            <TextField
            //  forwardedRef={searchField}
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
