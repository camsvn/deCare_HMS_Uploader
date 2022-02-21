import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => {
  const { fillColor = '#fff' } = props;

  return (
    <Svg
      width={24}
      height={24}
      {...props}
    >
      <Path
        data-name="Icon metro-search"
        d="m23.256 20.423-5.685-4.835a2.537 2.537 0 0 0-1.724-.748 9 9 0 1 0-1.007 1.007 2.537 2.537 0 0 0 .748 1.724l4.835 5.685a2.016 2.016 0 1 0 2.833-2.833ZM9 15a6 6 0 1 1 6-6 6 6 0 0 1-6 6Z"
        fill={fillColor}
      />
    </Svg>
  )
}

export default React.memo(SvgComponent)