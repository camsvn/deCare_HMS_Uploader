import * as React from "react"
import { View, ImageStyle } from "react-native"
import { AutoImage as Image } from "../auto-image/auto-image"
import { IconProps } from "./icon.props"
import { isVectorIcon } from "./icon.presets"
import { icons, vIcons } from "./icons"
import Svg from "react-native-svg"
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
  const { icon, containerStyle, fillColor, width = 24, height = 24 } = props
  const SvgIcon = vIcons[icon] as Svg;
  return (
    <View style={containerStyle}>
      <SvgIcon color={fillColor} width={width} height={height}/> 
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
