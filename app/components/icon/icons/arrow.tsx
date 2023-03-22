import * as React from "react"
import Svg, { Path, G, SvgProps } from "react-native-svg"

const SvgComponent = (props: SvgProps) => {
  const { 
    color = "#dd3333"
  } = props;

  return (
    <Svg
      height={800}
      width={800}
      viewBox="0 0 495 495"
      {...props}
    >
      <Path
        d="M247.5 0v140.792l131.619 131.191-28.238 28.33L247.5 197.269V495C384.19 495 495 384.19 495 247.5S384.19 0 247.5 0z"
        // fill={`${color}77`}
      />
      <Path
        d="M144.119 300.313l-28.238-28.33L247.5 140.792V0C110.81 0 0 110.81 0 247.5S110.81 495 247.5 495V197.269L144.119 300.313z"
        // fill={`${color}44`}
      />
      <Path
        d="M144.119 300.313L247.5 197.269 350.881 300.313 379.119 271.983 247.5 140.792 115.881 271.983z"
        fill={color}
      />
    </Svg>
  )
}

export default React.memo(SvgComponent)
