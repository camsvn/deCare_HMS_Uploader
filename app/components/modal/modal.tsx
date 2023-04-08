import * as React from "react"
import { ViewStyle, View, ColorValue, ViewProps, Modal as RNModal, TextStyle } from "react-native"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { color } from "../../theme";

type ModalProps = {
  visible?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
} & ViewProps;


const MODAL_MAIN_CONTAINER: ViewStyle = { 
  flex: 1, 
  backgroundColor: 'rgba(0,0,0,0.5)', 
  justifyContent: 'center', 
  alignItems: 'center' 
}

const MODAL_WRAPPER_VIEW: ViewStyle = { 
  backgroundColor: 'white', 
  padding: 20, 
  borderRadius: 10, 
  alignItems: 'center', 
  justifyContent: "center",
  // width: "70%"
  width: 350,
  height: 125
}

const INFO_TEXT: TextStyle = { 
  fontSize: 22, 
  fontWeight: 'bold', 
  marginBottom: 15
}

const BUTTON_VIEW: ViewStyle = { 
  flexDirection: 'row', 
  justifyContent: 'space-around', 
  width: "100%"
}

const BUTTON_CONTAINER: ViewStyle = {
  backgroundColor: color.primary, 
  width: 127, 
  height: 45
}

const BUTTON_TEXT: TextStyle = {
  fontSize: 14
}


export function Modal({ visible, onConfirm, onCancel }: ModalProps) {
  return (
    <RNModal visible={visible} transparent={true} animationType="fade">
      <View style={MODAL_MAIN_CONTAINER}>
        <View style={MODAL_WRAPPER_VIEW}>
          <Text style={INFO_TEXT}>Are you sure?</Text>
          <View style={BUTTON_VIEW}>
            <Button text="No, I'm Not" onPress={onCancel} style={BUTTON_CONTAINER} type="highlight" textStyle={BUTTON_TEXT}/>
            <Button text="Yes, I am" onPress={onConfirm} style={BUTTON_CONTAINER} type="highlight" textStyle={BUTTON_TEXT}/>
          </View>
        </View>
      </View>
    </RNModal>
  );
}