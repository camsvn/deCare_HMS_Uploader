import { ViewStyle, TextStyle } from "react-native"
import { color, spacing, typography } from "../../theme"

export const FULL: ViewStyle = { flex: 1, backgroundColor: color.background }

export const BORDER: ViewStyle = { borderColor: color.errorRed, borderWidth: 3 }

export const CONTAINER: ViewStyle = {
  flex: 1,
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
  fontSize: 40,
}

export const MAINVIEW_CONTAINER: ViewStyle = { flex: 1, justifyContent: "center" }
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

export const TEXT_FIELD_WRAPPER: ViewStyle = {
  // height: 30,
  width: "100%",
  // borderRadius: 5,
  // marginHorizontal: spacing[0],
  // borderColor: color.error,
  // borderWidth: 2,
  // marginVertical: spacing[3],
  // marginBottom: spacing[4]
}

export const TEXT_FIELD: TextStyle = {
  height: 30,
  width: "100%",
  fontSize: 16,
  paddingLeft: spacing[2],
  // flex: 1,
  borderRadius: 5,
  marginHorizontal: spacing[0],
  textAlignVertical: "top",
  borderColor: color.palette.black,
  borderWidth: 0.9,
  marginTop: spacing[3],
  marginBottom: spacing[4],
}

export const SHOW_PASSWORD_ICON: ViewStyle = {
  position: "absolute",
  right: 0,
  top: "15%",
  height: 45
}

export const CONFIG_URL_LINK: TextStyle = {
  color: color.dim,
  fontSize: 14,
  marginTop: spacing[4]
}
