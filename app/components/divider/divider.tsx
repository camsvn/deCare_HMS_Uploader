import * as React from "react"
import { ViewStyle, View, ColorValue, ViewProps } from "react-native"

type DividerProps = {
  color?: ColorValue;
  thickness?: number;
  orientation?: 'horizontal' | 'vertical';
} & ViewProps;

const DIVIDER_STYLE = (color: ColorValue, orientation: string, thickness: string | number) =>  (
    {
      backgroundColor: color,
      height: orientation === 'horizontal' ? thickness : '100%',
      width: orientation === 'vertical' ? thickness : '100%',
    }
  )


export function Divider({ color = '#EFEFEF', thickness = 1, orientation = 'horizontal', ...props }: DividerProps) {
  const {
    style: styleOverride,
  } = props
  return (
    <View
      style={[DIVIDER_STYLE(color, orientation, thickness) as ViewStyle, styleOverride]}
    />
  );
}