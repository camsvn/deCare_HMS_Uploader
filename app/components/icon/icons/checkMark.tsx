import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => {
  const { fillColor = '#63ff6c' } = props;

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={27} height={20.531} {...props}>
      <Path
        d="m8.6 16.166-6.35-6.36L0 11.951l8.6 8.58L27 2.145 24.75 0Z"
        fill={fillColor}
      />
    </Svg>
  )
}

export default React.memo(SvgComponent)
