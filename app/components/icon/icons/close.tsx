import * as React from "react"
import Svg, { Path, G, SvgProps } from "react-native-svg"

const SvgComponent = (props: SvgProps) => {
  const { color = '#c5c5c5' } = props;

  return (
    <Svg 
      width={25}
      height={25}
      viewBox="0 0 25 25"
      {...props}>
      <G stroke={color} strokeLinecap="round" strokeWidth={2}>
        <Path data-name="Line 3" d="m2.121 2.121 20.86 20.86" />
        <Path data-name="Line 4" d="m2.121 22.981 20.86-20.86" />
      </G>
    </Svg>
  )
}

export default React.memo(SvgComponent)
