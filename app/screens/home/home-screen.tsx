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
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"

import BlankCanvasSvg from './BlankCanvasSvg'
import { useRenderCount } from "../../utils/hooks/useRenderCount"
import { useStores } from "../../models"
import { showMessage, hideMessage } from "react-native-flash-message"
import homeScreenStyles from "./home-screen.style";


export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  ({ navigation }) => {

    const renderCount = useRenderCount();

    const nextScreen = () => navigation.navigate("demo")

    const onSubmitOP = () => {
      return ''
    }

    return (
      <>
      <View testID="WelcomeScreen" style={homeScreenStyles.FULL}>
        <Header
        //  leftIcon="cloudSync"
        //  rightIcon="checkMark" 
        //  leftIconSize={26}
        //  rightIconSize={24}
         headerTx="common.header" 
         style={homeScreenStyles.HEADER} 
         titleStyle={homeScreenStyles.HEADER_TITLE} 
         onLeftPress={()=>console.log("Header Left Pressed")}
         onRightPress={()=>console.log("Header Right Pressed")}
        />
        <Screen style={homeScreenStyles.CONTAINER} backgroundColor={color.transparent} preset="fixed">
          <View style={homeScreenStyles.NO_PATIENT_CONTAINER}>
            <HideWithKeyboard animate={true}>
              <View style={homeScreenStyles.INFO_IMAGE_CONTAINER}>
                <BlankCanvasSvg />
              </View>
            </HideWithKeyboard>
            <View style={homeScreenStyles.INFO_TEXT_CONTAINER}>
              <Text style={homeScreenStyles.TITLE}>
                There is no patient selected.
              </Text>
              <Text style={[homeScreenStyles.CONTENT, homeScreenStyles.CENTER]}>
                Once you choose a patient, they'll appear here.
              </Text>
              <Text style={[homeScreenStyles.CONTENT, homeScreenStyles.CENTER]}>Render {renderCount}</Text>
            </View>
          </View>
          <OpSearch navigation={navigation}/>
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
  navigation: StackNavigationProp<NavigatorParamList, "home">
}

const OpSearch = (props: TextFieldProps) => {
  const [text, onChangeText] = useState('');
  const { navigation } = props;

  const { opStore } = useStores()
  const { getPatient } = opStore

  const isSearchBoxEmpty = () => text === ''

  const onSubmit = () => {
    console.log(text)
    getPatient(text, (err) => {
      console.log("executing callback")
      if (!err) {
        navigation.navigate('tomogram', {opid: text});
        onChangeText('');
        console.log(opStore)
        return
      }
      showMessage({
        message: `Patient: ${err}`,
        type: "danger"
      })
    })
  }
  
  return (
    <View style={homeScreenStyles.OP_FORM}>
      <SearchTextField
        // blurWithoutKeyboard
        rightIcon = {text ? "close" : "unset"}
        containerStyle={homeScreenStyles.SEARCH_INPUT_WRAPPER}
        inputStyle={homeScreenStyles.SEARCH_INPUT}
        placeholder="Enter OP Number"
        keyboardType="numeric"
        returnKeyType="search"
        maxLength={7}
        radius={6}
        iconSize={16}
        onChangeText={onChangeText}
        value={text}
        onSubmitEditing={onSubmit}
        onRightPress={() => onChangeText('')}
      />
      {!isSearchBoxEmpty() && <Button style={homeScreenStyles.SUBMIT_BUTTON} onPress={onSubmit}>
        <Icon icon="checkMark" fillColor={color.palette.mirage} />
      </Button> }
    </View>
  )
}