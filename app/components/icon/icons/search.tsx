import * as React from "react"
import Svg, { Path, SvgProps, G } from "react-native-svg"

const SvgComponent = (props: SvgProps) => {
  const { color = '#c5c5c5'} = props;

  return (
    // <Svg
    //   width={24}
    //   height={24}
    //   viewBox="0 0 24 24"
    //   {...props}
    // >
    //   <Path
    //     data-name="Icon metro-search"
    //     d="m23.256 20.423-5.685-4.835a2.537 2.537 0 0 0-1.724-.748 9 9 0 1 0-1.007 1.007 2.537 2.537 0 0 0 .748 1.724l4.835 5.685a2.016 2.016 0 1 0 2.833-2.833ZM9 15a6 6 0 1 1 6-6 6 6 0 0 1-6 6Z"
    //     fill={color}
    //   />
    // </Svg>
    <Svg
    width={24.132}
    height={24.132}
    viewBox="0 0 24.132 24.132"
    {...props}
  >
    <G
      data-name="Icon feather-search"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <Path
        data-name="Path 84"
        d="M19.731 10.616A9.116 9.116 0 1 1 10.616 1.5a9.116 9.116 0 0 1 9.115 9.116Z"
      />
      <Path data-name="Path 85" d="m22.011 22.011-4.957-4.957" />
    </G>
  </Svg>
  )
}

export default React.memo(SvgComponent)