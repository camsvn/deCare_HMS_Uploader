import { ViewStyle, TextStyle } from "react-native"
import { color, spacing, typography } from "../../theme"


const FULL: ViewStyle = { flex: 1, backgroundColor: color.background }

const CONTAINER: ViewStyle = {
  // backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}

const BOLD: TextStyle = { fontWeight: "bold" }

const CENTER: TextStyle = {textAlign: "center"}

const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[3] + spacing[1],
  paddingHorizontal: 0,
  backgroundColor: color.primary,
  borderBottomLeftRadius: 5,
  borderBottomRightRadius: 5
}

const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  // lineHeight: 38,
  textAlign: "center",
  letterSpacing: 1.5
}

const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  color: color.text,
  fontSize: 20,
  lineHeight: 38
}

const CONTENT: TextStyle = {
  ...TEXT,
  color: color.dimText,
  fontSize: 15,
  lineHeight: 22
}

const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
}

const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}

const FOOTER: ViewStyle = { backgroundColor: "#20162D" }

const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

const NO_PATIENT_CONTAINER: ViewStyle = { flex: 1, justifyContent: "center" }

const INFO_IMAGE_CONTAINER: ViewStyle = { width: '85%', alignSelf: 'center' }

const INFO_TEXT_CONTAINER: ViewStyle = { 
  marginHorizontal: spacing[5],
  alignItems: 'center'
}

const OP_FORM: ViewStyle = { flexDirection: "row", marginBottom: spacing[2] }

const SEARCH_INPUT_WRAPPER: ViewStyle = { flex: 1,
  borderWidth: 1.25,
  borderRadius: 6,
  borderColor: '#c5c5c5',
  elevation: 2
}

const SEARCH_INPUT: TextStyle = {
  letterSpacing: 0.5,
  flex: 1,
  fontWeight: 'bold'
}

const SUBMIT_BUTTON: ViewStyle = {
  marginLeft: spacing[2],
  width: 53,
  borderRadius: 3,
  borderWidth: 0.1,
  borderColor: '#707070',
  backgroundColor: color.goGreen,  
  // elevation: 3
}

export default {
  FULL,
  CONTAINER,
  TEXT,
  BOLD,
  CENTER,
  HEADER,
  HEADER_TITLE,
  TITLE,
  CONTENT,
  CONTINUE,
  CONTINUE_TEXT,
  FOOTER,
  FOOTER_CONTENT,
  NO_PATIENT_CONTAINER,
  INFO_IMAGE_CONTAINER,
  INFO_TEXT_CONTAINER,
  OP_FORM,
  SEARCH_INPUT_WRAPPER,
  SEARCH_INPUT,
  SUBMIT_BUTTON,
}


