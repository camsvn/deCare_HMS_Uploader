import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

const SvgComponent = (props: SvgProps) => {
  const { color = '#63ff6c' } = props;

  return (
    <Svg width={27} height={20.531} viewBox="0 0 27 20.531" {...props}>
      <Path
        d="m8.6 16.166-6.35-6.36L0 11.951l8.6 8.58L27 2.145 24.75 0Z"
        fill={color}
      />
    </Svg>
  )
}

export default React.memo(SvgComponent)
