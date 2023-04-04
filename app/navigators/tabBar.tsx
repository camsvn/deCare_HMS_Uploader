import React from "react"
import { Text, View, TouchableOpacity, ViewStyle, TextStyle } from "react-native"
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { HideWithKeyboard } from '../components'
import { color } from "../theme";

export function MyTabBar({ state, descriptors, navigation } : BottomTabBarProps) {
  return (
    <HideWithKeyboard>
      <View style={FOOTER_CONTENT}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true, params: {} });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <View key={index} style={TAB_MAIN_CONTAINER}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={[BUTTON_WRAPPER, isFocused && BUTTON_WRAPPER_FOCUS]}
              >
                <Text style={TAB_TITLE}>
                  {label}
                </Text>
              </TouchableOpacity>
              {index !== state.routes.length-1 ? 
              <View
                style={DIVIDER}
              /> : null}
            </View>
          );
        })}
      </View>
    </HideWithKeyboard>
  );
}

const TAB_MAIN_CONTAINER: ViewStyle = {
  flex: 1,
  flexDirection: 'row'
}

const FOOTER_CONTENT: ViewStyle = {
  backgroundColor: color.primary,
  height: 74,
  flexDirection: "row"
}

const BUTTON_WRAPPER: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}

const BUTTON_WRAPPER_FOCUS: ViewStyle = {
  backgroundColor: color.opacity(0.5),
  borderRadius: 5,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomWidth: 2,
  borderBottomColor: color.palette.offWhite
}

const TAB_TITLE: TextStyle = {
  color: 'white'
}

const DIVIDER: ViewStyle = {
 borderWidth: 0.5,
 borderColor: 'white',
 height: 44,
 alignSelf: "center"
}