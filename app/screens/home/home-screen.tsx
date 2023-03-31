import React, { FC, useEffect, useState } from "react"
import { View, ViewStyle, TextStyle, SafeAreaView, TextInputProps, ScrollView, TouchableOpacity } from "react-native"
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
  Divider,
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"

import BlankCanvasSvg from './BlankCanvasSvg'
import { useRenderCount } from "../../utils/hooks/useRenderCount"
import { useStores } from "../../models"
import { showMessage, hideMessage } from "react-native-flash-message"
import homeScreenStyles from "./home-screen.style";
import * as storage from "../../utils/storage";

const OP_LIST_STORAGE_KEY = "opList"

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  ({ navigation }) => {

    const {opStore, recentSearchesStore} = useStores()
    const { searches, clearAll, deletePatientIfExist } = recentSearchesStore
    const { getPatient } = opStore
    

    const renderCount = useRenderCount();

    const nextScreen = () => navigation.navigate("demo")

    const onClickOP = (opid: number) => {
      getPatient(opid, (err) => {
        // console.log("executing callback")
        if (!err) {
          navigation.navigate('tomogram', {opid});
          // onChangeText('');
          // console.log(opStore)
          return
        }
        showMessage({
          message: `Patient: ${err}`,
          type: "danger"
        })
      })
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
          {/* <View style={homeScreenStyles.NO_PATIENT_CONTAINER}> */}
            { searches.length ? (
              <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
                <View style={{height: 50, backgroundColor: color.palette.white}}>
                  <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end"}}>
                    <Text style={[homeScreenStyles.TITLE, {marginTop: spacing[2]}]}>Recent Searches:</Text>
                    <Button style={[
                      {margin: spacing[1], paddingHorizontal: 0}
                      ]}
                      textStyle={[
                        homeScreenStyles.CONTENT,
                        {color: color.primary}
                        ]}
                      text="clear all"
                      preset="link"
                      onPress={clearAll}
                    />
                  </View>
                  <Divider/>
                </View>
                {searches.map((op) => (
                    <View key={op.id} style={{flexDirection: "row", marginVertical: 10}}>
                      <Button text={`${op.name}, ${op.opid}`} textStyle={{fontSize: 16}} style={{height:40, flex:2.5, backgroundColor: color.palette.offWhite, borderWidth: 1, borderColor: color.palette.black, borderRightWidth: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0}} preset="link"/>
                      <TouchableOpacity
                      onPressIn={() => onClickOP(op.opid)} 
                      style={{borderWidth: 1, borderColor: color.palette.black, justifyContent: "center", backgroundColor: color.errorRed, borderTopRightRadius: 3, borderBottomRightRadius: 3, padding: spacing[2]}} onPress={() => deletePatientIfExist(op.id)}>
                        <Icon  icon="delete" fillColor={color.palette.white} height={20} width={20} />
                      </TouchableOpacity>
                    </View>
                ))}
              </ScrollView>
            ) :
              (
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
              )
            }
          {/* </View> */}
          <OpSearch navigation={navigation}/>
        </Screen>
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
    getPatient(Number(text), (err) => {
      // console.log("executing callback")
      if (!err) {
        navigation.navigate('tomogram', {opid: Number(text)});
        onChangeText('');
        // console.log(opStore)
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