import React, {useState, useEffect} from 'react';
import {View, Animated} from 'react-native';
import { useKeyboardVisibilty } from '../../utils/hooks/useKeyboardVisibilty';

interface HideWithKeyboardProps {
  children?: React.ReactNode
  animate?: boolean
}

function HideWithKeyboard (props: HideWithKeyboardProps) {
  const { animate = false } = props;
  const isKeyboardVisible = useKeyboardVisibilty();
  const opacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isKeyboardVisible ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isKeyboardVisible, opacity]);

  const ComputedView = () => {
    if (isKeyboardVisible) {
      return null
    }
    else {
      if (!animate)
      return (
        <>
          {props.children}
        </>
      )
      return (
        <Animated.View style={{ opacity: opacity.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) }}>
          {props.children}
        </Animated.View>
      )
    }
  }

  return <ComputedView/>
}

function ShowWithKeyboard (props: HideWithKeyboardProps) {
  const isKeyboardVisible = useKeyboardVisibilty();
  
  if (!isKeyboardVisible)
    return <View />

  return (
    <>
      {props.children}
    </>
  )
}

export { HideWithKeyboard, ShowWithKeyboard };
export default HideWithKeyboard;