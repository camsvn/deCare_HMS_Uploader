/* eslint-disable react-native/split-platform-components */
import React, { FC, useState, useEffect } from "react"
import { View, TextInputProps, TouchableOpacity, ScrollView, PermissionsAndroid } from "react-native"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Button,
  Header,
  Screen,
  Text,
  TextField,
  Icon,
  HideWithKeyboard,
  GradientBackground,
  AutoImage as Image,
  BottomSheet,
  Divider,
  LoaderModal
} from "../../components"
import { color, spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"

import AddTomogramSvg from './AddTomogramSvg'
import AddButtonSvg from './AddButtonSvg'
import { useStores } from "../../models"

import * as tomogramScreenStyles from "./tomogram-screen.style";

import { launchCamera, launchImageLibrary, ImageLibraryOptions, CameraOptions } from 'react-native-image-picker'
import { requestPermission } from "../../utils/permission"
import { TomogramStoreModel, TomogramStore, Tomogram } from "../../models/tomogram/tomogram"
import { showMessage } from "react-native-flash-message"
import { Api } from "../../services/api"
import { ApiConfig } from "../../services/api/api-config"


// const tomogramStore = TomogramStoreModel.create({})

export const TomogramScreen: FC<StackScreenProps<NavigatorParamList, "tomogram">> = observer(
  ({ navigation, route }) => {

    const [tomogramStore, setTomogramStore] = useState<TomogramStore>(null)

    const { opid } = route.params;
    const { opStore, appConfig }  = useStores()    

    useEffect(() => {
      const api = new Api(appConfig.configURL)
      api.setup()
      const newTomogramStore = TomogramStoreModel.create({}, {'api': api})
      setTomogramStore(newTomogramStore)
    }, [appConfig.configURL]);

    const onSubmitOP = async () => {
      // showMessage({
      //   message: "Tomogram: Uploading, Please wait.",
      //   type: "info"
      // })
      tomogramStore.uploadTomograms( opid, true, (err) => {
        if (!err) {
          tomogramStore._setLoading(false)
          showMessage({
            message: "Tomogram: Uploaded",
            type: "success"
          })
          setTimeout(() => {
            tomogramStore._setLoading(false)
            tomogramStore.removeAllTomograms()
            navigation.navigate("home")            
          }, 500);
        } else {
          showMessage({
            message: `Tomogram Upload: ${err}`,
            type: "danger"
          })
        }
      })
    }

    const [visible, setVisible] = useState(false);

    const [hasPermission, setPermission] = useState(false);

    const handleChoosePhoto = () => {
      handleCloseBottomSheet()

      const options: ImageLibraryOptions = {
        mediaType: "photo",
        selectionLimit: 2
      }

      launchImageLibrary(options, response => {
        if (response.assets) {
          response.assets.forEach((asset) => {
            tomogramStore.addTomogram(asset.uri as string)
          })
        }
      })
    }

    const handleClickPhoto = () => {
      handleCloseBottomSheet()
      const options: CameraOptions = {
        mediaType: "photo",
        // saveToPhotos: true
      }
      launchCamera(options, response => {
        if (response.assets?.length) {
          tomogramStore.addTomogram(response.assets[0].uri as string)

        }
      })
    }

    const handleOpenBottomSheet = () => {
      (async () => {
        const permissions = [PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]

        const permissionResult = await requestPermission(permissions);
        setPermission(permissionResult);
        if (permissionResult)
          setVisible(true);
        else {
          navigation.navigate('permission', {permissionNames: ["Camera", "Files and media"], permissions: permissions})
        }
      })()
    };

    const handleCloseBottomSheet = () => {
      setVisible(false);
    };

    return (
      <>
        {tomogramStore && (
          <View testID="WelcomeScreen" style={tomogramScreenStyles.FULL}>
            <Header
              rightIcon={tomogramStore.tomograms.length ? "checkMark" : "unset"}
              leftIconSize={26}
              rightIconSize={24}
              headerTx="common.header"
              style={tomogramScreenStyles.HEADER}
              titleStyle={tomogramScreenStyles.HEADER_TITLE}
              onRightPress={() => onSubmitOP()}
            />
            <LoaderModal visible={tomogramStore.isLoading} loadingText="Uploading"/>

            <View style={tomogramScreenStyles.PATIENT_NAME_CONTAINER}>
              <GradientBackground colors={["#E6E6E6", "#FFF"]} locations={[0.5, 1]} />
              <Text style={[tomogramScreenStyles.TITLE, tomogramScreenStyles.TITLE_VIEW]}>
                {opStore.name}
              </Text>
              <TouchableOpacity
                style={tomogramScreenStyles.ADD_BUTTON_CONTAINER}
                onPress={handleOpenBottomSheet}
              >
                <AddButtonSvg styleOveride={tomogramScreenStyles.ADD_BUTTON} />
              </TouchableOpacity>
              <BottomSheet visible={visible} onClose={handleCloseBottomSheet}>
                <View style={{ marginHorizontal: spacing[4] }}>
                  <Button
                    text="Choose from Gallery"
                    textStyle={tomogramScreenStyles.BOTTOM_SHEET_BUTTON}
                    preset="link"
                    onPress={handleChoosePhoto}
                  />
                  <Divider color={color.dim} thickness={1.5} />
                  <Button
                    text="Take Photo"
                    textStyle={tomogramScreenStyles.BOTTOM_SHEET_BUTTON}
                    preset="link"
                    onPress={handleClickPhoto}
                  />
                  <Divider color={color.dim} thickness={1} />
                  <Button
                    text="Cancel"
                    textStyle={tomogramScreenStyles.BOTTOM_SHEET_BUTTON}
                    preset="link"
                    onPress={handleCloseBottomSheet}
                  />
                </View>
              </BottomSheet>
            </View>
            <Screen
              style={tomogramScreenStyles.CONTAINER}
              backgroundColor={color.transparent}
              preset="fixed"
            >
              <View
                style={
                  tomogramStore?.tomograms.length > 0
                    ? tomogramScreenStyles.PATIENT_CONTAINER
                    : tomogramScreenStyles.NO_PATIENT_CONTAINER
                }
              >
                {tomogramStore?.tomograms.length > 0 ? (
                  <TomogramListView store={tomogramStore} />
                ) : (
                  <NoTomogramView />
                )}
              </View>
              <HideWithKeyboard>
                <OpSearch title={opid} navigation={navigation} store={tomogramStore}/>
              </HideWithKeyboard>
            </Screen>
          </View>
        )}
      </>
    )
  },
)

interface TomogramScreenProps {
  store: TomogramStore;
}

const TomogramListView = observer(({store} : TomogramScreenProps) => {
  
  const renderItem = (item: Tomogram) => {
    return (
      <View key={item.id} style={tomogramScreenStyles.TLV_CONTAINER}>
        <View style={tomogramScreenStyles.TLV_DELETE_CONTAINER}>
          <TouchableOpacity onPress={ (e) => store.removeTomogram(item.id)}>
            <Icon  icon="delete" fillColor={color.errorRed} height={20} width={20} />
          </TouchableOpacity>
        </View>
        <View style={tomogramScreenStyles.TLV_IMAGE_CONTAINER}>
          <Image
              source={{uri: store.getTomogram(item.id)}}
              style={tomogramScreenStyles.TLV_IMAGE_VIEW}
            />
        </View>
        <View style={tomogramScreenStyles.TLV_DESCRIPTION_CONTAINER}>
          <TextField
            inputStyle={tomogramScreenStyles.TLV_DESCRIPTION_FIELD}
            radius={5}
            multiline={true}
            value={item.description}
            onChangeText={(text) => store.updateTomogramDescription(item.id, text)}
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
      {store.tomograms.map((item) => renderItem(item))}
    </ScrollView>
  )
})

const NoTomogramView = () => {
  return (
    <>          
      <View style={tomogramScreenStyles.INFO_IMAGE_CONTAINER}>
        <AddTomogramSvg />
      </View>
      <View style={tomogramScreenStyles.INFO_TEXT_CONTAINER}>
        <Text style={tomogramScreenStyles.TITLE}>
          There is no tomogram added.
        </Text>
        <Text style={[tomogramScreenStyles.CONTENT, tomogramScreenStyles.CENTER]}>
          Once you add tomogram details, they'll appear here.
        </Text>
        {/* <Text style={[tomogramScreenStyles.CONTENT, tomogramScreenStyles.CENTER]}>Render {renderCount}</Text> */}
      </View>
    </>
  )
}

interface TextFieldProps extends TextInputProps {
  title: number
  navigation: StackNavigationProp<NavigatorParamList, 'tomogram'>,
  store: TomogramStore
}

const OpSearch = (props: TextFieldProps) => {
  const [text, onChangeText] = useState('');
  const {title, navigation, store} = props;
  const isSearchBoxEmpty = () => text === ''

  const onExit = async () => {
    await store.removeAllTomograms()
    navigation.canGoBack() && navigation.goBack();
  }
  
  return (
    <View style={tomogramScreenStyles.OP_FORM}>
      <TextField
        // blurWithoutKeyboard
        rightIcon = {navigation.canGoBack() ? "close" : "unset"}
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
        value={String(title)}
        editable={false}
        onRightPress={onExit}
      />
      {!isSearchBoxEmpty() && <Button style={tomogramScreenStyles.SUBMIT_BUTTON}>
        <Icon icon="checkMark" fillColor={color.palette.mirage} />
      </Button> }
    </View>
  )
}