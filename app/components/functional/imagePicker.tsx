import React, { FC, useState } from "react"
import { View, Button } from 'react-native'
import { launchCamera, launchImageLibrary, Asset, ImageLibraryOptions, CameraOptions } from 'react-native-image-picker'
import { AutoImage as Image } from '../'

export const ImagePickerComponent = () => {
  const [photo, setPhoto] = useState<Asset>()

  const handleChoosePhoto = () => {
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
  
  return (
    <View style={{ flex: 2, alignItems: 'flex-end', justifyContent: 'space-between' }}>
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
        )}
        <Button title="Choose Photo" onPress={handleChoosePhoto} />
        <Button title="Click Photo" onPress={handleClickPhoto} />
        <Button title="Remove" onPress={() => setPhoto(null)} />
      </View>
  )
}