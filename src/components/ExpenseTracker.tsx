// ExpenseTracker.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import ExpenseList from './ExpenseList';
import ExpenseFilter from './ExpenseFilter';
import ExpenseForm from './ExpenseForm';
import ExpenseDialog from './ExpenseDialog';
import FloatingButton from './FloatingButton';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, setExpenses } from '../store/expenseSlice';
import { Expense, Medium } from '../types';
import { addMedium, setMediums } from '../store/mediumSlice';
import { addExpenseWithSQLite } from '../store/expenseThunks';
import { addMediumWithSQLite } from '../store/mediumThunks';
import { loadInitialExpensesFromSQLite, loadInitialMediumFromSQLite } from '../database';



const ExpenseTracker: React.FC = () => {
  const dispatch = useDispatch();  
  const expenses = useSelector((state: any) => state.expenses.expenses);
  const mediums = useSelector((state: any) => state.mediums.mediums);  
  const [filteredMedium, setFilteredMedium] = useState<string>('');
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  useEffect(()=> {
    (async () => {
      const expenses = await loadInitialExpensesFromSQLite();
      const mediums = await loadInitialMediumFromSQLite();
      dispatch(setExpenses(expenses));
      dispatch(setMediums(mediums));
    })();
  }, [])

  const handleFilterChange = (medium: string) => {
    setFilteredMedium(medium);
  };

  const handleAddExpense = (expense: Expense) => {
    dispatch(addExpenseWithSQLite({...expense,id: Math.random()}));
    if(!mediums.some((medium: Medium) => medium.medium === expense.medium)) {
      dispatch(addMediumWithSQLite({medium: expense.medium}));
    }
    setDialogVisible(false); // Close the dialog after adding expense
  };

  const filteredExpenses = filteredMedium
    ? expenses.filter((expense: Expense) => expense.medium === filteredMedium)
    : expenses;

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={{ alignItems: 'flex-start', flexDirection: 'row' }} >
          <ExpenseFilter
            mediums={mediums?.map((medium: Medium) => medium.medium) || [] } // Array.from(new Set(expenses.map((expense: Expense) => expense.medium)))  You can replace this with dynamically fetched mediums
            selectedMedium={filteredMedium}
            onSelectMedium={handleFilterChange}
          />
        </View>
        <ExpenseList expenses={filteredExpenses} />
        <Text style={{textAlign: 'left', fontSize: 30, color: 'blue'}} >Total: $ {filteredExpenses.reduce((acc:number,cv:Expense) => acc + cv.amount, 0 )}</Text>
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
