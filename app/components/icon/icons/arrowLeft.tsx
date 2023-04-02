import * as React from "react"
import Svg, { Path, G, SvgProps } from "react-native-svg"

const SvgComponent = (props: SvgProps) => {
  const { color = '#c5c5c5' } = props;

  return (
    <Svg
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <Path
        d="M25.002 13.014c.551 0 .998.46.998 1.025 0 .567-.447 1.026-.998 1.026l-19.563-.003 8.918 9.156c.39.401.39 1.051 0 1.452l-.028.03c-.39.4-1.024.4-1.415 0L2.31 14.811a1.027 1.027 0 01-.247-.42 1.047 1.047 0 01-.013-.674 1.03 1.03 0 01.274-.526L12.932 2.301a.982.982 0 011.414 0l.029.03c.39.4.39 1.05 0 1.451l-8.99 9.23 19.617.002z"
        fill={color}
      />
    </Svg>
  )
}

export default React.memo(SvgComponent)
