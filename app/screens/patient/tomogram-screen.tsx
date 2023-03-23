import React, { FC, useState, useCallback } from "react"
import { View, ViewStyle, TextStyle, SafeAreaView, TextInputProps, TouchableOpacity, FlatList, StyleSheet, ScrollView, PermissionsAndroid } from "react-native"
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
  AutoImage as Image,
  BottomSheet,
  Divider
} from "../../components"
import { ImagePickerComponent } from '../../components/functional'
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"

import AddTomogramSvg from './AddTomogramSvg'
import AddButtonSvg from './AddButtonSvg'
import { useRenderCount } from "../../utils/hooks/useRenderCount"
import { useStores } from "../../models"

import * as tomogramScreenStyles from "./tomogram-screen.style";

import { launchCamera, launchImageLibrary, Asset, ImageLibraryOptions, CameraOptions } from 'react-native-image-picker'



// async function requestFileSystemPermission() {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//       {
//         title: 'App File System Permission',
//         message: 'App needs access to your file system',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('File system permission granted');
//     } else {
//       console.log('File system permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// }



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

    const [visible, setVisible] = useState(false);

    const [photo, setPhoto] = useState<Asset>()

  const handleChoosePhoto = () => {
    handleCloseBottomSheet()
    const options: ImageLibraryOptions = {
      // noData: true,
      mediaType: "photo",
      // selectionLimit: 3
    }
    launchImageLibrary(options, response => {
      if (response.assets?.length) {
        setPhoto(response.assets[0])
      }
    })
  }

  const handleClickPhoto = () => {
    handleCloseBottomSheet()
    const options: CameraOptions = {
      // noData: true,
      mediaType: "photo",
      // saveToPhotos: true
    }
    launchCamera(options, response => {
      if (response.assets?.length) {
        setPhoto(response.assets[0])
      }
    })
  }

    const handleOpenBottomSheet = () => {
      setVisible(true);
    };

    const handleCloseBottomSheet = () => {
      setVisible(false);
    };

    return (
      <>
      <View testID="WelcomeScreen" style={tomogramScreenStyles.FULL}>
        <Header
        //  leftIcon="cloudSync"
         rightIcon="checkMark" 
         leftIconSize={26}
         rightIconSize={24}
         headerTx="common.header" 
         style={tomogramScreenStyles.HEADER} 
         titleStyle={tomogramScreenStyles.HEADER_TITLE} 
         onLeftPress={()=>console.log("Header Left Pressed")}
         onRightPress={()=>console.log("Header Right Pressed")}
        />
        <View style={tomogramScreenStyles.PATIENT_NAME_CONTAINER}>
          <GradientBackground colors={["#E6E6E6", "#FFF"]} locations={[.5,1]} />
          <Text style={[tomogramScreenStyles.TITLE, tomogramScreenStyles.TITLE_VIEW]}>
            {opStore.name}
          </Text>
          <TouchableOpacity style={tomogramScreenStyles.ADD_BUTTON_CONTAINER} onPress={handleOpenBottomSheet}>
            <AddButtonSvg styleOveride={tomogramScreenStyles.ADD_BUTTON}/>
          </TouchableOpacity>
          <BottomSheet visible={visible} onClose={handleCloseBottomSheet}>
            <View style={{marginHorizontal: spacing[4]}}>
              <Button text="Camera" textStyle={{paddingVertical: spacing[4], letterSpacing: 0.25}} preset="link" onPress={handleClickPhoto}/>
              <Divider color={color.dim} thickness={1.5}/>
              <Button text="Gallery" textStyle={{paddingVertical: spacing[4], letterSpacing: 0.25}} preset="link" onPress={handleChoosePhoto}/>
              <Divider color={color.dim} thickness={1} />
              <Button text="Cancel" textStyle={{paddingVertical: spacing[4], letterSpacing: 0.25}} preset="link" onPress={handleCloseBottomSheet}/>              
            </View>
          </BottomSheet>
          {/* <Button style={[SUBMIT_BUTTON, {position: 'relative', right: 10, top: 35, borderRadius: 30, width:60, height: 60}]}>
            <Icon icon="camera" fillColor={color.palette.mirage} style />
          </Button> */}
        </View>
        <Screen style={tomogramScreenStyles.CONTAINER} backgroundColor={color.transparent} preset="fixed">
          <View style={data.length > 0 ? tomogramScreenStyles.PATIENT_CONTAINER : tomogramScreenStyles.NO_PATIENT_CONTAINER}>
            {data.length > 0 ? <TomogramListView data={data} setData={setData} /> : <NoTomogramView renderCount={renderCount}/>}
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
          <HideWithKeyboard>
            <OpSearch title={opid} navigation={navigation}/>
          </HideWithKeyboard>
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


// const TomogramListView = (props) => {
//   const {data, setData} = props;

//   const updateDescription = (index, description) => {
//     const newData = [...data];
//     console.log(index, description)
//     newData[index].description = description;
//     setData(newData);
//   }

//   const Item = ({item, index, onChange}) => (
//     <View style={styles.item}>
//       <Text style={styles.title}>Description</Text>
//       <TextField  inputStyle={{flex:1, height:80, borderRadius: 5,  marginHorizontal: spacing[0], fontSize:14, textAlignVertical: 'top'  }}  
//       radius={5} 
//       multiline={true}  
//       blurOnSubmit={false}
//       value={item.description}
//       // onChangeText={(text) => onChange(index, text)}
//       onChange={(e) => onChange(index, e.nativeEvent.text)}
//       />
//       {/* <Text style={styles.title}>{title}</Text> */}
//     </View>
//   );

//   return (
//     <FlatList
//         data={data}
//         renderItem={({item, index}) => <Item item={item} index={index} onChange={updateDescription}/>}
//         keyExtractor={item => item.id}
//         // style={{
//         //   borderColor: 'red', 
//         //   borderWidth: 3, 
//         //   // position: 'absolute', 
//         //   // right: 0,
//         //   // top: 0,
//         // }}
//       />
    
//   )
// }

const TomogramListView = (props) => {
  const {data, setData} = props;

  //   const updateDescription = useCallback((index, description) => {
  //   const newData = [...data];
  //   console.log(index, description)
  //   newData[index].description = description;
  //   setData(newData);
  //   // setData(data.map((item, i) => (i === index ? { ...item, description } : item)));
  // }, [setData])

  const updateDescription = (index, description) => {
    const newData = [...data];
    // console.log(index, description)
    newData[index].description = description;
    setData(newData);
    // setData(data.map((item, i) => (i === index ? { ...item, description } : item)));
  }

  const renderItem = (item, index) => {
    return (
      <View key={item.id} style={tomogramScreenStyles.TLV_CONTAINER}>
        <View style={{position: "absolute", right:3, top: 5}}>
          <TouchableOpacity>
            <Icon  icon="delete" fillColor={color.errorRed} height={20} width={20} />
          </TouchableOpacity>
        </View>
        <View style={tomogramScreenStyles.TLV_IMAGE_CONTAINER}>
          <Image
              source={require('../../../assets/images/no_image.png')}
              style={tomogramScreenStyles.TLV_IMAGE_VIEW}
            />
        </View>
        <View style={tomogramScreenStyles.TLV_DESCRIPTION_CONTAINER}>
          <TextField
            inputStyle={tomogramScreenStyles.TLV_DESCRIPTION_FIELD}
            radius={5}
            multiline={true}
            value={item.description}
            onChangeText={(text) => updateDescription(index, text)}
            blurOnSubmit={false}
            preset="secondary"
            label="Description"
            labelStyle={{color:color.palette.black}}
          />
        </View>
      </View>
    );
  }

  return (
    <ScrollView>
      {data.map((item, index) => renderItem(item, index))}
    </ScrollView>
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