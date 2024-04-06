// ExpenseFilter.tsx
import React from 'react';
import { View } from 'react-native';
import { Button, Menu } from 'react-native-paper';

interface ExpenseFilterProps {
  mediums: string[];
  selectedMedium: string;
  onSelectMedium: (medium: string) => void;
}

const ExpenseFilter: React.FC<ExpenseFilterProps> = ({ mediums, selectedMedium, onSelectMedium }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>{selectedMedium ? selectedMedium : "Filter by Medium"}</Button>}
      >
        {mediums.map((medium) => (
          <Menu.Item key={medium} onPress={() => { onSelectMedium(medium); closeMenu(); }} title={medium} />
        ))}
        <Menu.Item onPress={() => { onSelectMedium(''); closeMenu(); }} title="Clear Filter" />
      </Menu>
    </View>
  );
};

export default ExpenseFilter;
