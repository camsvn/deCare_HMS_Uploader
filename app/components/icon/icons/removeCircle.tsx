import * as React from "react"
import Svg, { Path, G, SvgProps } from "react-native-svg"

const SvgComponent = (props: SvgProps) => {
  const { color = "#ff6c63" } = props;

  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" {...props}>
    <Path
      data-name="Icon material-remove-circle"
      d="M9 0a9 9 0 1 0 9 9 9 9 0 0 0-9-9Zm4.5 9.9h-9V8.1h9Z"
      fill={color}
    />
  </Svg>
  )
}

export default React.memo(SvgComponent)
