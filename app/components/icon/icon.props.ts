import { ColorValue, ImageStyle, StyleProp, ViewStyle } from "react-native"
import { Color, NumberProp } from "react-native-svg"
import { IconTypes, VIconTypes } from "./icons"

export interface IconProps {
  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the icon container
   */

  containerStyle?: StyleProp<ViewStyle>

  /**
   * The name of the icon
   */

  icon?: IconTypes | VIconTypes
  fillColor?: Color
  width?: NumberProp
  height?: NumberProp
}
