// ExpenseItem.tsx
import React from 'react';
import { List, Text, useTheme } from 'react-native-paper';
import { Expense } from '../types';

const ExpenseItem: React.FC<Expense> = ({ description, amount, medium, date }) => {
  const theme = useTheme();

  return (
    <List.Item
      title={description}
      description={`Medium: ${medium}, Date: ${new Date(date).toLocaleDateString()}`}
      left={(props) => <List.Icon {...props} icon="cash" color={theme.colors.primary} />}
      style={{ backgroundColor: theme.colors.surface, marginBottom: 8, borderRadius: 8 }}
      titleStyle={{ color: theme.colors.primary }}
      right={() => <Text style={{ color: theme.colors.primary, fontSize: 26 }} >$ {amount}</Text>}
    />
  );
};

export default ExpenseItem;
