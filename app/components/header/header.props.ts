import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { IconTypes, VIconTypes } from "../icon/icons"
import { TxKeyPath } from "../../i18n"

export type IconsType = IconTypes | VIconTypes
type IconType = IconsType | "unset"

export interface HeaderProps {
  /**
   * Main header, e.g. POWERED BY IGNITE
   */
  headerTx?: TxKeyPath

  /**
   * header non-i18n
   */
  headerText?: string

  /**
   * Icon that should appear on the left
   */
  leftIcon?: IconType

  /**
   * What happens when you press the left icon
   */
  onLeftPress?(): void

  /**
   * Icon that should appear on the right
   */
  rightIcon?: IconType

  /**
   * What happens when you press the right icon
   */
  onRightPress?(): void

  /**
   * Container style overrides.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Title style overrides.
   */
  titleStyle?: StyleProp<TextStyle>
}
