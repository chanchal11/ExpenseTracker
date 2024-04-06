// ExpenseTracker.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import ExpenseList from './ExpenseList';
import ExpenseFilter from './ExpenseFilter';
import ExpenseForm from './ExpenseForm';
import ExpenseDialog from './ExpenseDialog';
import FloatingButton from './FloatingButton';

interface Expense {
  id: string;
  description: string;
  amount: number;
  medium: string;
}

const initialExpenses: Expense[] = [
  { id: '1', description: 'Groceries', amount: 50, medium: 'Food' },
  { id: '2', description: 'Electricity Bill', amount: 100, medium: 'Utilities' },
  { id: '3', description: 'Dinner', amount: 30, medium: 'Food' },
];

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [filteredMedium, setFilteredMedium] = useState<string>('');
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  const handleFilterChange = (medium: string) => {
    setFilteredMedium(medium);
  };

  const handleAddExpense = (expense: Expense) => {
    setExpenses([...expenses, { ...expense, id: (expenses.length + 1).toString() }]);
    setDialogVisible(false); // Close the dialog after adding expense
  };

  const filteredExpenses = filteredMedium
    ? expenses.filter((expense) => expense.medium === filteredMedium)
    : expenses;

  return (
    <PaperProvider>
      <View style={styles.container}>
        <ExpenseFilter
          mediums={['Food', 'Utilities', 'Others']} // You can replace this with dynamically fetched mediums
          selectedMedium={filteredMedium}
          onSelectMedium={handleFilterChange}
        />
        <ExpenseList expenses={filteredExpenses} />
        <FloatingButton onPress={() => setDialogVisible(true)} />
        <ExpenseDialog
          visible={dialogVisible}
          onClose={() => setDialogVisible(false)}
          onSubmit={handleAddExpense}
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    position: 'relative',
  },
});

export default ExpenseTracker;
