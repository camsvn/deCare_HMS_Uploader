import * as React from "react"
import { TouchableOpacity, Pressable } from "react-native"
import { color } from "../../theme"
import { Text } from "../text/text"
import { viewPresets, textPresets } from "./button.presets"
import { ButtonProps } from "./button.props"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = "primary",
    tx,
    text,
    type = "opacity",
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    ...rest
  } = props

  const viewStyle = viewPresets[preset] || viewPresets.primary
  const viewStyles = [viewStyle, styleOverride]
  const textStyle = textPresets[preset] || textPresets.primary
  const textStyles = [textStyle, textStyleOverride]

  const content = children || <Text tx={tx} text={text} style={textStyles} />

  if (type === 'opacity')
    return (
      <TouchableOpacity style={viewStyles} {...rest}>
        {content}
      </TouchableOpacity>
    )

  return (
    <Pressable android_ripple={{color: color.dimWhite, borderless: true}} style={viewStyles} {...rest}>
      {content}
    </Pressable>
  )
}
