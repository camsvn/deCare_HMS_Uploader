import { ViewStyle, TextStyle } from "react-native"
import { color, spacing, typography } from "../../theme"

export const FULL: ViewStyle = { flex: 1, backgroundColor: color.background }

export const BORDER: ViewStyle = { borderColor: color.errorRed, borderWidth: 3 }

export const CONTAINER: ViewStyle = {
  // flex: 0.5,
  marginHorizontal: spacing[4]
}

export const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}

export const BOLD: TextStyle = { fontWeight: "bold" }
export const MARGIN_BOTTOM: TextStyle = { marginBottom: spacing[2] }

export const CENTER: TextStyle = { textAlign: "center" }

export const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  color: color.text,
  fontSize: 40,
}

export const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[3] + spacing[1],
  paddingHorizontal: 0,
  backgroundColor: color.primary,
  borderBottomLeftRadius: 5,
  borderBottomRightRadius: 5,
  zIndex: 0
}

export const HEADER_VIEW: ViewStyle = { 
  position: "relative", 
  top: 10, 
  zIndex: 1
}

export const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  // lineHeight: 38,
  textAlign: "center",
  letterSpacing: 1.5
}

export const CONTENT: TextStyle = {
  ...TEXT,
  // color: color.dimText,
  color: color.primary,
  fontSize: 14,
  letterSpacing: 0.5,
  lineHeight: 20
  // lineHeight: 22
}

export const PRIMARY_CONTENT: TextStyle = {
  fontSize: 22,
  fontWeight: "bold",
  marginTop: spacing[3],
  letterSpacing: 0.3
}

export const MAINVIEW_CONTAINER: ViewStyle = { marginHorizontal: spacing[0] }
export const LOGOVIEW_CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
}

export const LOGO_CONTAINER: ViewStyle = {
  width: 60,
  height: 60,
}

export const FORM_CONTAINER: ViewStyle = {
  flex: 1.25,
  marginHorizontal: spacing[5],
  alignItems: "center",
}

export const SUBMIT_BUTTON: ViewStyle = {
  height: 45,
  width: "100%",
  borderRadius: 5,
  marginTop: spacing[5],
  backgroundColor: color.primary,
}

export const TEXT_FIELD: TextStyle = {
  height: 30,
  width: "100%",
  borderRadius: 5,
  marginHorizontal: spacing[0],
  textAlignVertical: "top",
  borderColor: color.palette.black,
  borderWidth: 0.9,
  marginVertical: spacing[3],
  marginBottom: spacing[4],
}

export const BUTTON_CONTAINER: ViewStyle = {
  paddingHorizontal: 0,
  flexDirection: "row",
  alignItems: "center"
}

export const LOGOUT_BUTTON_CONTAINER: ViewStyle = {
  ...BUTTON_CONTAINER,
  justifyContent: "flex-start"
}

export const LOGOUT_TEXT: TextStyle = {
  paddingVertical: spacing[4]
}

export const LOGOUT_ICON: ViewStyle = {
  transform: [{ rotate: '180deg' }],
  marginLeft: 5
}

export const BUTTON_SPACING_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  flex: 1
}