import React, { FC, useState } from "react"
import { View, ViewStyle, TextStyle, SafeAreaView, TextInputProps, TouchableOpacity, FlatList, StyleSheet } from "react-native"
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
  GradientBackground,
} from "../../components"
import { ImagePickerComponent } from '../../components/functional'
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"

import AddTomogramSvg from './AddTomogramSvg'
import AddButtonSvg from './AddButtonSvg'
import { useRenderCount } from "../../utils/hooks/useRenderCount"
import { useStores } from "../../models"

import * as tomogramScreenStyles from "./tomogram-screen.style";


export const TomogramScreen: FC<StackScreenProps<NavigatorParamList, "tomogram">> = observer(
  ({ navigation, route }) => {

    const { opid } = route.params;

    const renderCount = useRenderCount();
    const { opStore }  = useStores()
    const [data, setData] = useState([
      { id: 1, tomogram: 'default_tomogram_uri', description: 'default_description1' },
      { id: 2, tomogram: 'default_tomogram_uri', description: 'default_description2' },
      { id: 3, tomogram: 'default_tomogram_uri', description: 'default_description3' },
      { id: 4, tomogram: 'default_tomogram_uri', description: 'default_description4' },
      { id: 5, tomogram: 'default_tomogram_uri', description: 'default_description5' },
      { id: 6, tomogram: 'default_tomogram_uri', description: 'default_description6' },
      { id: 7, tomogram: 'default_tomogram_uri', description: 'default_description7' },
      { id: 8, tomogram: 'default_tomogram_uri', description: 'default_description8' },
      { id: 9, tomogram: 'default_tomogram_uri', description: 'default_description9' },
    ]);

    const nextScreen = () => navigation.navigate("demo")

    const onSubmitOP = () => {
      return ''
    }

    return (
      <>
      <View testID="WelcomeScreen" style={tomogramScreenStyles.FULL}>
        <Header
         leftIcon="cloudSync"
         rightIcon="checkMark" 
         leftIconSize={26}
         rightIconSize={24}
         headerTx="common.header" 
         style={tomogramScreenStyles.HEADER} 
         titleStyle={tomogramScreenStyles.HEADER_TITLE} 
         onLeftPress={()=>console.log("Header Left Pressed")}
         onRightPress={()=>console.log("Header Right Pressed")}
        />
        <View style={{flexDirection: 'row'}}>
          <GradientBackground colors={["#E6E6E6", "#FFF"]} locations={[.5,1]} />
          <Text style={[tomogramScreenStyles.TITLE, {flex: 1, paddingLeft: spacing[4]}]}>
            {opStore.name}
          </Text>
          <TouchableOpacity style={{position: 'relative', top: 30,right: 5, height:60, width: 60, borderRadius: 50}}>
            <AddButtonSvg styleOveride={{height:55, width: 55}}/>
          </TouchableOpacity>
          {/* <Button style={[SUBMIT_BUTTON, {position: 'relative', right: 10, top: 35, borderRadius: 30, width:60, height: 60}]}>
            <Icon icon="camera" fillColor={color.palette.mirage} style />
          </Button> */}
        </View>
        <Screen style={tomogramScreenStyles.CONTAINER} backgroundColor={color.transparent} preset="fixed">
          <View style={data ? tomogramScreenStyles.PATIENT_CONTAINER : tomogramScreenStyles.NO_PATIENT_CONTAINER}>
            {data ? <TomogramListView data={data} setData={setData} /> : <NoTomogramView renderCount={renderCount}/>}
          {/* <NoPatientView renderCount={renderCount}/> */}
            {/* <View style={{
              borderColor: 'red', 
              borderWidth: 3, 
              position: 'absolute', 
              right: 0,
              top: 0,}}>
              <ImagePickerComponent />
            </View> */}
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

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});

const TomogramListView = (props) => {
  const {data, setData} = props;

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <FlatList
        data={data}
        renderItem={({item}) => <Item title={item.description} />}
        keyExtractor={item => item.id}
        // style={{
        //   borderColor: 'red', 
        //   borderWidth: 3, 
        //   // position: 'absolute', 
        //   // right: 0,
        //   // top: 0,
        // }}
      />
    
  )
}

const NoTomogramView = (props) => {
  const {renderCount} = props;
  return (
    <>
      {/* <View style={NO_PATIENT_CONTAINER}> */}
        {/* <View style={{
          borderColor: 'red', 
          borderWidth: 3, 
          position: 'absolute', 
          right: 0,
          top: 0,}}>
          <ImagePickerComponent />
        </View> */}
        {/* <HideWithKeyboard> */}            
          <View style={tomogramScreenStyles.INFO_IMAGE_CONTAINER}>
            <AddTomogramSvg />
          </View>
        {/* </HideWithKeyboard> */}
        <View style={tomogramScreenStyles.INFO_TEXT_CONTAINER}>
          <Text style={tomogramScreenStyles.TITLE}>
            There is no tomogram added.
          </Text>
          <Text style={[tomogramScreenStyles.CONTENT, tomogramScreenStyles.CENTER]}>
            Once you add tomogram details, they'll appear here.
          </Text>
          <Text style={[tomogramScreenStyles.CONTENT, tomogramScreenStyles.CENTER]}>Render {renderCount}</Text>
        </View>
      {/* </View> */}
    </>
  )
}

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
    <View style={tomogramScreenStyles.OP_FORM}>
      <TextField
        // blurWithoutKeyboard
        rightIcon = {"close"}
        style={tomogramScreenStyles.SEARCH_INPUT_WRAPPER}
        containerStyle={tomogramScreenStyles.SEARCH_INPUT_CONTAINER}
        inputStyle={tomogramScreenStyles.SEARCH_INPUT}
        labelStyle={tomogramScreenStyles.SEARCH_INPUT_LABLE}
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
      {!isSearchBoxEmpty() && <Button style={tomogramScreenStyles.SUBMIT_BUTTON} onPress={() => console.log('Submit Button',text)}>
        <Icon icon="checkMark" fillColor={color.palette.mirage} />
      </Button> }
    </View>
  )
}