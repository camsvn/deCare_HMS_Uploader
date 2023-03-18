import { ViewStyle, TextStyle } from "react-native"
import { color, spacing, typography } from "../../theme"

export const FULL: ViewStyle = { flex: 1, backgroundColor: color.background }
export const CONTAINER: ViewStyle = {
  // backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
export const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
export const BOLD: TextStyle = { fontWeight: "bold" }
export const CENTER: TextStyle = {textAlign: "center"}
export const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[3] + spacing[1],
  paddingHorizontal: 0,
  backgroundColor: color.primary,
  borderBottomLeftRadius: 5,
  borderBottomRightRadius: 5
}
export const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  // lineHeight: 38,
  textAlign: "center",
  letterSpacing: 1.5
}
export const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  color: color.text,
  fontSize: 20,
  lineHeight: 65,
}
export const CONTENT: TextStyle = {
  ...TEXT,
  color: color.dimText,
  fontSize: 15,
  lineHeight: 22
}
export const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
}
export const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
export const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
export const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}
export const NO_PATIENT_CONTAINER: ViewStyle = { flex: 1, justifyContent: "center" }
export const PATIENT_CONTAINER: ViewStyle = { flex: 1, marginTop: 30, marginBottom: 10}
export const INFO_IMAGE_CONTAINER: ViewStyle = { width: '75%', alignSelf: 'center', transform: [{translateX: -10}] }
export const INFO_TEXT_CONTAINER: ViewStyle = { 
  marginHorizontal: spacing[5],
  alignItems: 'center'
}
export const OP_FORM: ViewStyle = { flexDirection: "row", marginBottom: spacing[2] }
export const SEARCH_INPUT_CONTAINER: ViewStyle = { flex: 1,
  // borderWidth: 1.25,
  // borderRadius: 6,
  // borderColor: '#c5c5c5',
  // elevation: 2
}
export const SEARCH_INPUT_WRAPPER: ViewStyle = {
  // elevation: 2,
  borderWidth: 1.25,
  borderRadius: 6,
  borderColor: '#c5c5c5',
  // position: 'relative',
  // zIndex: 2
}
export const SEARCH_INPUT_LABLE: TextStyle = {
  position: 'absolute',
  // elevation: 3,
  zIndex: 2,
  left: 10,
  top: -8,
  // width: 50,
  // height: 500,
  backgroundColor: 'white'
}
export const SEARCH_INPUT: TextStyle = {
  letterSpacing: 0.5,
  flex: 1,
  fontWeight: 'bold',
  marginLeft: spacing[3],
  color: "#696969"
}
export const SUBMIT_BUTTON: ViewStyle = {
  marginLeft: spacing[2],
  width: 53,
  borderRadius: 3,
  borderWidth: 0.1,
  borderColor: '#707070',
  backgroundColor: color.goGreen,  
  // elevation: 3
}