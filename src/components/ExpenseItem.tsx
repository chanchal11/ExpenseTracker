// ExpenseItem.tsx
import React from 'react';
import { List } from 'react-native-paper';

interface ExpenseItemProps {
  description: string;
  amount: number;
  medium: string;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ description, amount, medium }) => {
  return (
    <List.Item
      title={description}
      description={`Amount: ${amount}, Medium: ${medium}`}
      left={(props) => <List.Icon {...props} icon="cash" />}
    />
  );
};

export default ExpenseItem;
