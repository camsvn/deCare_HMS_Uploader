import * as React from "react"
import { View, ImageStyle } from "react-native"
import { AutoImage as Image } from "../auto-image/auto-image"
import { IconProps } from "./icon.props"
import { isVectorIcon } from "./icon.presets"
import { icons, vIcons } from "./icons"
import Cloud from "./icons/cloudSyncO.svg";

const ROOT: ImageStyle = {
  resizeMode: "contain",
}

function PNGIcon(props: IconProps) {
  const { style: styleOverride, icon, containerStyle } = props

  return (
    <View style={containerStyle}>
      <Image style={[ROOT, styleOverride]} source={icons[icon]} /> 
    </View>
  )
}

function VIcon (props: IconProps) {
  const { icon, containerStyle } = props
  const SvgIcon = vIcons[icon];
  return (
    <View style={containerStyle}>
      <SvgIcon /> 
    </View>
  ) 
}

export function Icon(props: IconProps) {
  if (isVectorIcon(props.icon)) {
    return <VIcon {...props} />
  } else {
    return <PNGIcon {...props} />
  }
}
