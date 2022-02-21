import React, {useEffect, useRef} from "react"
import { ImageStyle, StyleProp, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native"
import { color, spacing, typography } from "../../theme"
import { translate, TxKeyPath } from "../../i18n"
import { Text } from "../text/text"
import { useKeyboardVisibilty } from "../../utils/hooks/useKeyboardVisibilty"
import { IconTypes, VIconTypes } from "../icon/icons"
import { Icon } from "../icon/icon"
import { Button } from "../button/button"

export type IconsType = IconTypes | VIconTypes
type IconType = IconsType | "unset"

// the base styling for the container
const CONTAINER: ViewStyle = {
  // paddingVertical: spacing[3],
}

const INPUT_WRAPPER: ViewStyle = {
  flexDirection: 'row',
  backgroundColor: 'white'
}

// the base styling for the TextInput
const INPUT: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
  minHeight: 44,
  fontSize: 18,
  backgroundColor: color.palette.white,
  marginHorizontal: spacing[2]
}

const ICON: ViewStyle = {
  alignSelf: "center",
  paddingLeft: spacing[4],
  paddingVertical: spacing[3]
}

const UNSET_BACKICON_STYLE: ViewStyle = {
  paddingRight: 0,
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {
            
  } as ViewStyle,
}

export interface TextFieldProps extends TextInputProps {
  /**
   * The placeholder i18n key.
   */
  placeholderTx?: TxKeyPath

  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string

  /**
   * The label i18n key.
   */
  labelTx?: TxKeyPath

  /**
   * The label text if no labelTx is provided.
   */
  label?: string

  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: StyleProp<TextStyle>

  containerStyle? : StyleProp<ViewStyle>

  iconStyle? : StyleProp<ViewStyle>

  /**
   * Various look & feels.
   */
  preset?: keyof typeof PRESETS

  forwardedRef?: any

  blurWithoutKeyboard?: boolean

  rightIcon?: IconType

  leftIcon?: IconType

  onRightPress?: () => void

  radius?: number

  iconSize?: number

  showBackButton?: boolean

  onBackPress?: () => void
}

/**
 * A component which has a label and an input together.
 */
function DefaultTextField(props: TextFieldProps) {
  const {
    placeholderTx,
    placeholder,
    labelTx,
    label,
    onRightPress,
    onBackPress,
    iconSize,
    rightIcon,
    leftIcon,
    showBackButton = false,
    preset = "default",
    style: styleOverride,
    containerStyle: ContainerStyleOverride,
    inputStyle: inputStyleOverride,
    iconStyle: iconStyleOverride,
    forwardedRef,
    radius,
    ...rest
  } = props

  const containerStyles = [CONTAINER, PRESETS[preset], ContainerStyleOverride, {borderRadius: radius}]
  const inputWrapperStyles = [INPUT_WRAPPER, styleOverride, {borderRadius: radius}]
  const iconStyles = [ICON, iconStyleOverride]
  const inputStyles = [INPUT, inputStyleOverride]
  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder

  return (
    <View style={containerStyles}>
      {labelTx || label &&
        <Text preset="fieldLabel" tx={labelTx} text={label} />
      }
      <View style={inputWrapperStyles}>
        {!showBackButton ? leftIcon && leftIcon !=="unset" &&
          <View style={iconStyles}>
            <Icon icon={leftIcon as IconsType} width={iconSize}/>
          </View>
          :
          <Button preset="link" onPress={onBackPress} type="opacity" highlightColor={'#a8a8a8'} style={UNSET_BACKICON_STYLE}>
            <Icon icon="back" />
          </Button>
        }
        <TextInput
          placeholder={actualPlaceholder}
          placeholderTextColor={color.dimText}
          underlineColorAndroid={color.transparent}
          {...rest}
          style={inputStyles}
          ref={forwardedRef}
        />
        {rightIcon && rightIcon !=="unset" &&
          <Button preset="link" onPress={onRightPress} type="opacity" highlightColor={'#a8a8a8'}
          style={iconStyles}
          >
            <Icon icon={rightIcon as IconsType} width={iconSize}/>
          </Button>
        }
      </View>
    </View>
  )
}

/**
 * A component which has a label and an input together. And Blur the input field with KeyboardHide event
 */
function BlurTextFieldWithoutKeyboard (props: TextFieldProps) {
  const isKeyboardVisible = useKeyboardVisibilty();
  const textField = useRef<TextInput>();

  const {forwardedRef, ...rest} = props

  useEffect(() => {
    if (!isKeyboardVisible && textField.current.isFocused()) {
      textField.current.blur();
    }
  }, [isKeyboardVisible]);
  
  return <DefaultTextField {...rest} forwardedRef={textField} />
}

/**
 * A component which has a label, icons and an input together. And Blur the input field with KeyboardHide event
 */
 export function SearchTextField (props: TextFieldProps) {
  const isKeyboardVisible = useKeyboardVisibilty();
  const textField = useRef<TextInput>();

  const {forwardedRef, ...rest} = props

  useEffect(() => {
    if (!isKeyboardVisible && textField.current.isFocused()) {
      textField.current.blur();
    }
  }, [isKeyboardVisible]);
  
  return <DefaultTextField 
          rightIcon = "close"
          leftIcon = "search"
          showBackButton = {isKeyboardVisible}
          onBackPress = {() => textField.current.blur()}
          forwardedRef={textField}
          {...rest}
        />
}

/**
 * A component which has a label and an input together.
 */
export function TextField (props: TextFieldProps) {
  if (props.blurWithoutKeyboard)
    return <BlurTextFieldWithoutKeyboard {...props}/>

  return <DefaultTextField {...props}/>
}