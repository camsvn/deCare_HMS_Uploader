import React, {} from 'react';
import {View} from 'react-native';
import { useKeyboardVisibilty } from '../../utils/hooks/useKeyboardVisibilty';

interface HideWithKeyboardProps {
  children?: React.ReactNode
}

function HideWithKeyboard (props: HideWithKeyboardProps) {
  const isKeyboardVisible = useKeyboardVisibilty();
  
  if (isKeyboardVisible)
    return <View />

  return (
    <>
      {props.children}
    </>
  )
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