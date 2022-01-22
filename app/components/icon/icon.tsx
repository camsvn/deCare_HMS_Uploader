import * as React from "react"
import { View, ImageStyle } from "react-native"
import { AutoImage as Image } from "../auto-image/auto-image"
import { IconProps } from "./icon.props"
import { icons, VIcons } from "./icons"
import Cloud from "./icons/cloudSyncO.svg";

const ROOT: ImageStyle = {
  resizeMode: "contain",
}

export function Icon(props: IconProps) {
  const { style: styleOverride, icon, containerStyle } = props
  let SvgIcon;
  if (Object.keys(VIcons).includes(icon)) {SvgIcon = VIcons[icon]};  

  return (
    <View style={containerStyle}>
      {
        Object.keys(icons).includes(icon) ?
         <Image style={[ROOT, styleOverride]} source={icons[icon]} /> :
         Object.keys(VIcons).includes(icon) ?
          <SvgIcon /> : null
      }
      {/* <Cloud /> */}
    </View>
  )
}
