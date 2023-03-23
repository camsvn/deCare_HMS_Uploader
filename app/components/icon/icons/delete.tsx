import * as React from "react"
import Svg, { Path, G, SvgProps } from "react-native-svg"

const SvgComponent = (props: SvgProps) => {
  const { 
    color = "#000000"
  } = props;

  return (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <G
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M10 12v5M14 12v5M4 7h16M6 10v8a3 3 0 003 3h6a3 3 0 003-3v-8M9 5a2 2 0 012-2h2a2 2 0 012 2v2H9V5z" />
      </G>
    </Svg>
  )
}

export default React.memo(SvgComponent)
