// ExpenseTracker.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import ExpenseList from './ExpenseList';
import ExpenseFilter from './ExpenseFilter';
import ExpenseForm from './ExpenseForm';
import ExpenseDialog from './ExpenseDialog';
import FloatingButton from './FloatingButton';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, addMedium, Expense, Medium } from '../store/expenseSlice';



const ExpenseTracker: React.FC = () => {
  const dispatch = useDispatch();  
  const expenses = useSelector((state: any) => state.expenses.expenses);
  const mediums = useSelector((state: any) => state.expenses.mediums);  
  const [filteredMedium, setFilteredMedium] = useState<string>('');
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  const handleFilterChange = (medium: string) => {
    setFilteredMedium(medium);
  };

  const handleAddExpense = (expense: Expense) => {
    dispatch(addExpense({ ...expense, id: (expenses.length + 1).toString() }));
    dispatch(addMedium(expense.medium));
    setDialogVisible(false); // Close the dialog after adding expense
  };

  const filteredExpenses = filteredMedium
    ? expenses.filter((expense: Expense) => expense.medium === filteredMedium)
    : expenses;

  return (
    <PaperProvider>
      <View style={styles.container}>
        <ExpenseFilter
          mediums={mediums.map((medium: Medium) => medium.medium)} // Array.from(new Set(expenses.map((expense: Expense) => expense.medium)))  You can replace this with dynamically fetched mediums
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
