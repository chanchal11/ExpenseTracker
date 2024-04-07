// ExpenseList.tsx
import React from 'react';
import { FlatList } from 'react-native';
import { List } from 'react-native-paper';
import ExpenseItem from './ExpenseItem';
import { ExpenseWithId } from '../types';

interface ExpenseListProps {
  expenses: ExpenseWithId[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id.toString()}
      style={{maxHeight:'80%'}}
      renderItem={({ item }) => (
        <ExpenseItem
          key={item.id}
          description={item.description}
          amount={item.amount}
          medium={item.medium}
          date={item.date}
        />
      )}
    />
  );
};

export default ExpenseList;
