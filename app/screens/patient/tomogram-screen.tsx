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
} from "../../components"
import { ImagePickerComponent } from '../../components/functional'
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"

import AddTomogramSvg from './AddTomogramSvg'
import { useRenderCount } from "../../utils/hooks/useRenderCount"

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
  borderBottomLeftRadius: 5,
  borderBottomRightRadius: 5
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
const INFO_IMAGE_CONTAINER: ViewStyle = { width: '75%', alignSelf: 'center', transform: [{translateX: -10}] }
const INFO_TEXT_CONTAINER: ViewStyle = { 
  marginHorizontal: spacing[5],
  alignItems: 'center'
}
const OP_FORM: ViewStyle = { flexDirection: "row", marginBottom: spacing[2] }
const SEARCH_INPUT_CONTAINER: ViewStyle = { flex: 1,
  // borderWidth: 1.25,
  // borderRadius: 6,
  // borderColor: '#c5c5c5',
  // elevation: 2
}
const SEARCH_INPUT_WRAPPER: ViewStyle = {
  // elevation: 2,
  borderWidth: 1.25,
  borderRadius: 6,
  borderColor: '#c5c5c5',
  // position: 'relative',
  // zIndex: 2
}
const SEARCH_INPUT_LABLE: TextStyle = {
  position: 'absolute',
  // elevation: 3,
  zIndex: 2,
  left: 10,
  top: -8,
  // width: 50,
  // height: 500,
  backgroundColor: 'white'
}
const SEARCH_INPUT: TextStyle = {
  letterSpacing: 0.5,
  flex: 1,
  fontWeight: 'bold',
  marginLeft: spacing[3],
  color: "#696969"
}
const SUBMIT_BUTTON: ViewStyle = {
  marginLeft: spacing[2],
  width: 53,
  borderRadius: 3,
  borderWidth: 0.1,
  borderColor: '#707070',
  backgroundColor: color.goGreen,  
  // elevation: 3
}

export const TomogramScreen: FC<StackScreenProps<NavigatorParamList, "tomogram">> = observer(
  ({ navigation, route }) => {

    const { opid } = route.params;

    const renderCount = useRenderCount();

    const nextScreen = () => navigation.navigate("demo")

    const onSubmitOP = () => {
      return ''
    }

    return (
      <>
      <View testID="WelcomeScreen" style={FULL}>
        <Header
         leftIcon="cloudSync"
         rightIcon="checkMark" 
         leftIconSize={26}
         rightIconSize={24}
         headerTx="common.header" 
         style={HEADER} 
         titleStyle={HEADER_TITLE} 
         onLeftPress={()=>console.log("Header Left Pressed")}
         onRightPress={()=>console.log("Header Right Pressed")}
        />
        <Screen style={CONTAINER} backgroundColor={color.transparent} preset="fixed">
          <View style={NO_PATIENT_CONTAINER}>
            <ImagePickerComponent />
            {/* <HideWithKeyboard> */}
              {/* <View style={INFO_IMAGE_CONTAINER}>
                <AddTomogramSvg />
              </View> */}
            {/* </HideWithKeyboard> */}
            {/* <View style={INFO_TEXT_CONTAINER}>
              <Text style={TITLE}>
                There is no tomogram added.
              </Text>
              <Text style={[CONTENT, CENTER]}>
                Once you add tomogram details, they'll appear here.
              </Text>
              <Text style={[CONTENT, CENTER]}>Render {renderCount}</Text>
            </View> */}
          </View>
          <OpSearch title={opid} navigation={navigation}/>
        </Screen>
        {/* <HideWithKeyboard>
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
        </HideWithKeyboard> */}
      </View>
      </>
    )
  },
)

interface TextFieldProps extends TextInputProps {
  title: string
  navigation: StackNavigationProp<NavigatorParamList, 'tomogram'>
}

const OpSearch = (props: TextFieldProps) => {
  const [text, onChangeText] = useState('');
  const {title, navigation} = props;
  const isSearchBoxEmpty = () => text === ''

  const onExit = () => {
    navigation.goBack();
  }
  
  return (
    <View style={OP_FORM}>
      <TextField
        // blurWithoutKeyboard
        rightIcon = {"close"}
        style={SEARCH_INPUT_WRAPPER}
        containerStyle={SEARCH_INPUT_CONTAINER}
        inputStyle={SEARCH_INPUT}
        labelStyle={SEARCH_INPUT_LABLE}
        placeholder="Enter OP Number"
        keyboardType="numeric"
        returnKeyType="search"
        label="Op Number"
        maxLength={7}
        radius={6}
        iconSize={16}
        value={title}
        editable={false}
        onRightPress={onExit}
      />
      {!isSearchBoxEmpty() && <Button style={SUBMIT_BUTTON} onPress={() => console.log('Submit Button',text)}>
        <Icon icon="checkMark" fillColor={color.palette.mirage} />
      </Button> }
    </View>
  )
}