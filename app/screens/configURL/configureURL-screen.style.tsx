import { ViewStyle, TextStyle, ImageStyle } from "react-native"
import { color, spacing, typography } from "../../theme"

export const FULL: ViewStyle = { flex: 1, backgroundColor: color.background }

export const BORDER: ViewStyle = { borderColor: color.errorRed, borderWidth: 3 }

export const CONTAINER: ViewStyle = {
  // backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}

export const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}

export const BOLD: TextStyle = { fontWeight: "bold" }

export const CENTER: TextStyle = { textAlign: "center" }

export const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  color: color.text,
  fontSize: 20,
  lineHeight: 38,
}

export const CONTENT: TextStyle = {
  ...TEXT,
  color: color.dimText,
  fontSize: 15,
  lineHeight: 22,
}

export const URLLOGOVIEW_CONTAINER: ViewStyle = { flex: 1, justifyContent: "center" }

export const URLLOGO: ImageStyle = { width: "100%", height: 300 }

export const INFO_TEXT_CONTAINER: ViewStyle = {
  marginHorizontal: spacing[5],
  alignItems: "center",
}

export const SUBMIT_BUTTON: ViewStyle = {
  // marginLeft: spacing[2],
  height: 45,
  width: "100%",
  borderRadius: 5,
  // borderWidth: 0.1,
  // borderColor: '#707070',
  backgroundColor: color.primary,
  // elevation: 3
}

export const URL_FIELD: TextStyle = {
  // flex:1,
  height: 30,
  width: "100%",
  borderRadius: 5,
  marginHorizontal: spacing[0],
  // fontSize:14,
  textAlignVertical: "top",
  borderColor: color.palette.black,
  borderWidth: 0.9,
  marginVertical: spacing[3],
  marginBottom: spacing[4]
}