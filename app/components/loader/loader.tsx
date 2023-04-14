import * as React from "react"
import { ViewStyle, View, ViewProps, Modal, ActivityIndicator, TextStyle } from "react-native"
import { color } from "../../theme";
import { Text } from '../../components'


type LoaderProps = {
  visible?: boolean;
  loadingText?: string;
} & ViewProps;

const ACTIVITY_INDICATOR_WRAPPER: ViewStyle = {
  alignItems: 'center',
  backgroundColor: color.palette.white,
  borderRadius: 10,
  height: 100,
  justifyContent: 'center',
  width: 200,
  elevation: 50
}

const MODAL_BACKGROUND: ViewStyle = {
  alignItems: 'center',
  backgroundColor: color.opacity(0.5),
  flex: 1,
  justifyContent: 'center',
}

const MARGIN_BOTTOM: TextStyle = {
  marginBottom: 5,
  color: color.primary,
  letterSpacing: 1
}

const MARGIN_TOP: TextStyle = {
  marginTop: 5,
  color: color.primary,
  letterSpacing: 0.75
}

export const LoaderModal = ({ visible, loadingText }: LoaderProps) => {
  const loadingTextDefault = loadingText || 'Loading';
  return (
  <Modal transparent visible={visible}>
    <View style={MODAL_BACKGROUND}>
      <View style={ACTIVITY_INDICATOR_WRAPPER}>
        <Text style={MARGIN_BOTTOM}>Please wait</Text>
        <ActivityIndicator animating={visible} size={"large"} color={color.primary}/>
        <Text style={MARGIN_TOP}>{'. . . ' + loadingTextDefault + ' . . .'}</Text>
      </View>
    </View>
  </Modal>
)};