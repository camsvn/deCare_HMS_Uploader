import * as React from "react"
import Svg, { Path, G, SvgProps } from "react-native-svg"

const SvgComponent = (props: SvgProps) => {
  const { 
    color = "#292D32"
  } = props;

  return (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      // transform="scale(-1 1)"
      {...props}
    >
      <G
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M8.9 7.56c.31-3.6 2.16-5.07 6.21-5.07h.13c4.47 0 6.26 1.79 6.26 6.26v6.52c0 4.47-1.79 6.26-6.26 6.26h-.13c-4.02 0-5.87-1.45-6.2-4.99M15 12H3.62M5.85 8.65L2.5 12l3.35 3.35" />
      </G>
    </Svg>
  )
}

export default React.memo(SvgComponent)
