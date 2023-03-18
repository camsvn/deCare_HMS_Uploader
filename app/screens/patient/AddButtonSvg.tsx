import * as React from "react"
import Svg, { Path, Circle, G } from "react-native-svg"
import { ViewProps, View, ViewStyle, TouchableOpacity } from "react-native"


const CONTAINER: ViewStyle = {
  aspectRatio: 1
}

interface SVGProps extends ViewProps {
  styleOveride?: ViewStyle
}

const SvgComponent = (props: SVGProps) => (
  // const {width, height, styleOveride} = props
  <View style={[CONTAINER, props.styleOveride]}>
  <Svg
    width={props.styleOveride.width || 70.454}
    height={props.styleOveride.height || 70.454}
    // width='100%' height='100%'
    viewBox="0 0 70.454 70.454"
    {...props}
  >
    <G transform="translate(-281.134 -432.989)">
        <Circle
          data-name="Ellipse 6"
          cx={35.227}
          cy={35.227}
          r={35.227}
          transform="translate(281.134 432.989)"
          fill="#6c63ff"
        />
        <Path
          data-name="Path 86"
          d="M887.987 676.463h-12.252V664.21a4.595 4.595 0 10-9.19 0v12.253h-12.253a4.595 4.595 0 100 9.19h12.253v12.253a4.595 4.595 0 109.19 0v-12.254h12.253a4.595 4.595 0 000-9.19z"
          transform="translate(-554.779 -212.842)"
          fill="#fff"
        />
      </G>
  </Svg>
  </View>
)

export default SvgComponent
