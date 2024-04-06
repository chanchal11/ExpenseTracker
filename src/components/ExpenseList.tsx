// ExpenseList.tsx
import React from 'react';
import { FlatList } from 'react-native';
import { List } from 'react-native-paper';
import ExpenseItem from './ExpenseItem';

interface Expense {
  id: string;
  description: string;
  amount: number;
  medium: string;
}

interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ExpenseItem
          description={item.description}
          amount={item.amount}
          medium={item.medium}
        />
      )}
    />
  );
};

export default ExpenseList;
