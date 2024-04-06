// FloatingButton.tsx
import React from 'react';
import { FAB } from 'react-native-paper';

interface FloatingButtonProps {
  onPress: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onPress }) => {
  return (
    <FAB
      style={{
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 80,
      }}
      icon="plus"
      onPress={onPress}
    />
  );
};

export default FloatingButton;
