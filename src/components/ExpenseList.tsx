// ExpenseList.tsx
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import ExpenseItem from './ExpenseItem';
import { ExpenseWithId } from '../types';

interface ExpenseListProps {
  expenses: ExpenseWithId[];
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    maxHeight: '76%'
  },
});

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id.toString()}
      style={styles.container}
      inverted={true}
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