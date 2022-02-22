import * as React from "react"
import Svg, { Path, G, SvgProps } from "react-native-svg"

const SvgComponent = (props: SvgProps) => {
  const { color = "#151d28" } = props;

  return (
    <Svg
    width={28.5}
    height={26.022}
    viewBox="0 0 28.5 26.022"
    {...props}
  >
    <Path
      data-name="Icon material-add-a-photo"
      d="M3.717 3.717V0H6.2v3.717h3.713V6.2H6.2v3.717H3.717V6.2H0V3.717Zm3.717 7.435V7.435h3.717V3.717h8.674L22.094 6.2h3.928A2.486 2.486 0 0 1 28.5 8.674v14.87a2.486 2.486 0 0 1-2.478 2.478H6.2a2.486 2.486 0 0 1-2.478-2.478V11.152ZM16.109 22.3a6.2 6.2 0 1 0-6.2-6.2 6.2 6.2 0 0 0 6.2 6.2Zm-3.965-6.2a3.965 3.965 0 1 0 3.965-3.965 3.961 3.961 0 0 0-3.966 3.974Z"
      fill={color}
    />
  </Svg>
  )
}

export default React.memo(SvgComponent)
