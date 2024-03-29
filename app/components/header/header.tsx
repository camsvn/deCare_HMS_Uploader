import React from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { HeaderProps, IconsType } from "./header.props"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { Icon } from "../icon/icon"
import { spacing } from "../../theme"
import { translate } from "../../i18n/"

// static styles
const ROOT: ViewStyle = {
  flexDirection: "row",
  // paddingHorizontal: spacing[4],
  // alignItems: "center",
  // paddingTop: spacing[5],
  // paddingBottom: spacing[5],
  // justifyContent: "flex-start"

}
const TITLE: TextStyle = { textAlign: "center" }
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: "center" }
const LEFT: ViewStyle = { width: 32 }
const LEFT_BUTTON: ViewStyle = { paddingHorizontal: 0, marginHorizontal: spacing[4] }
const BUTTON: ViewStyle = { paddingHorizontal: 0, marginHorizontal: spacing[4], position: 'absolute', top: 18 }
const RIGHT: ViewStyle = { width: 32 }
const BORDER: ViewStyle = {borderWidth:2, borderColor: 'red'}

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
  const {
    onLeftPress,
    onRightPress,
    rightIcon,
    leftIcon,
    leftIconSize,
    rightIconSize,
    leftIconStyle,
    rightIconStyle,
    headerText,
    headerTx,
    style,
    titleStyle,
  } = props
  const header = headerText || (headerTx && translate(headerTx)) || ""

  return (
    <View style={[ROOT, style]}>
      {/* {leftIcon  && leftIcon !== 'unset' ? (
        <Button preset="link" onPress={onLeftPress} type="highlight"
        style={[BUTTON, {left: 0}]}
        >
          <Icon icon={leftIcon as IconsType} width={leftIconSize} />
        </Button>
      ) : (
        <View style={LEFT} />
      )} */}
      {leftIcon  && leftIcon !== 'unset' && (
        <Button preset="link" onPress={onLeftPress} type="highlight"
        style={[BUTTON, {left: 0}, leftIconStyle]}
        >
          <Icon icon={leftIcon as IconsType} width={leftIconSize} />
        </Button>
      )}
      <View style={TITLE_MIDDLE}>
        <Text style={[TITLE, titleStyle]} text={header} />
      </View>
      {/* {rightIcon && rightIcon !== "unset" ? (
        <Button preset="link" onPress={onRightPress} type="highlight"
        style={[BUTTON, {right: 0}]}
        >
          <Icon icon={rightIcon as IconsType} width={rightIconSize}/>
        </Button>
      ) : (
        <View style={RIGHT} />
      )} */}
      {rightIcon && rightIcon !== "unset" && (
        <Button preset="link" onPress={onRightPress} type="highlight"
        style={[BUTTON, {right: 0}, rightIconStyle]}
        >
          <Icon icon={rightIcon as IconsType} width={rightIconSize}/>
        </Button>
      )}
    </View>
  )
}
