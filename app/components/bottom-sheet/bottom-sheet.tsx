import React, { useState, useRef } from 'react';
import { 
  View,
  Modal,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  ViewStyle
 } from 'react-native';
import { spacing } from '../../theme';

type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const MASK_VIEW: ViewStyle = {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)'
}

const MAIN_CONTAINER: ViewStyle = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'white',
  marginHorizontal: spacing[2],
  // height: 200,
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5
}

export function BottomSheet({ visible, onClose, children }: BottomSheetProps) {
  const [height, setHeight] = useState(0);
  const translateY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 0 && gestureState.dy > gestureState.dx;
      },
      onPanResponderMove: (_, gestureState) => {
        translateY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > height / 2) {
          Animated.timing(translateY, {
            toValue: height,
            duration: 300,
            useNativeDriver: true,
          }).start(onClose);
        } else {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const handleLayout = (event) => {
    setHeight(event.nativeEvent.layout.height);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={MASK_VIEW} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          MAIN_CONTAINER,
          {transform: [{ translateY }]}
        ]}
        onLayout={handleLayout}
        {...panResponder.panHandlers}>
        {children}
      </Animated.View>
    </Modal>
  );
}