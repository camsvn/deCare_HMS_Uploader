import React, { FC, useState } from "react"
import { View, TextInputProps, ScrollView, TouchableOpacity } from "react-native"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Button,
  Header,
  Screen,
  Text,
  SearchTextField,
  Icon,
  HideWithKeyboard,
  Divider,
} from "../../components"
import { color, spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"

import BlankCanvasSvg from './BlankCanvasSvg'
import { useRenderCount } from "../../utils/hooks/useRenderCount"
import { useStores } from "../../models"
import { showMessage } from "react-native-flash-message"
import homeScreenStyles from "./home-screen.style";

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  ({ navigation }) => {

    const {opStore, recentSearchesStore} = useStores()
    const { searches, clearAll, deletePatientIfExist } = recentSearchesStore
    const { getPatient } = opStore
    

    const renderCount = useRenderCount();

    const onClickOP = (opid: number) => {
      getPatient(opid, (err) => {
        if (!err) {
          navigation.navigate('tomogram', {opid});
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
                <View style={homeScreenStyles.LIST_MAIN_VIEW}>
                  <View style={homeScreenStyles.LIST_HEADER_CONTAINER}>
                    <Text style={[homeScreenStyles.TITLE, {marginTop: spacing[2]}]}>Recent Searches:</Text>
                    <Button style={homeScreenStyles.LIST_CLEAR_BUTTON}
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
                    <View key={op.id} style={homeScreenStyles.LIST_CONTAINER}>
                      <Button 
                        text={`${op.name}, ${op.opid}`}
                        textStyle={homeScreenStyles.BUTTON_TEXT}
                        style={homeScreenStyles.LIST_BUTTON_VIEW}
                        preset="link"
                        onPress={() => onClickOP(op.opid)}
                      />
                      <TouchableOpacity
                        style={homeScreenStyles.DELETE_LIST}
                        onPress={() => deletePatientIfExist(op.id)}
                      >
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
        <Icon icon="checkMark" fillColor={color.palette.white} />
      </Button> }
    </View>
  )
}