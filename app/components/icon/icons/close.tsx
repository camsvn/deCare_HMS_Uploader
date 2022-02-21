import * as React from "react"
import Svg, { Path, G } from "react-native-svg"

const SvgComponent = (props) => {
  const { fillColor = '#63ff6c' } = props;

  return (
    <Svg width={25.102} height={25.102} {...props}>
      <G fill={fillColor} stroke="#707070" strokeLinecap="round" strokeWidth={3}>
        <Path data-name="Line 3" d="m2.121 2.121 20.86 20.86" />
        <Path data-name="Line 4" d="m2.121 22.981 20.86-20.86" />
      </G>
    </Svg>
  )
}

export default React.memo(SvgComponent)
