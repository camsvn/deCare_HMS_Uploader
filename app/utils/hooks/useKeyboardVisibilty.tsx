import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';


export const useKeyboardVisibilty = () => {
  const [isKeyboardVisible, setKeyboardVisibility] = useState(false);

  const handleKeyboardVisibilityChange = (value: boolean) => {
    isKeyboardVisible !== value && setKeyboardVisibility(value)
  }

  useEffect(() => {
    const keyboardShowSub = Keyboard.addListener('keyboardDidShow', () => handleKeyboardVisibilityChange(true));
    const keyboardHideSub = Keyboard.addListener('keyboardDidHide', () => handleKeyboardVisibilityChange(false));
  
    return () => {
      keyboardShowSub.remove();
      keyboardHideSub.remove();
    };
  });

  return isKeyboardVisible;
}
