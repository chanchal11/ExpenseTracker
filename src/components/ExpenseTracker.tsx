// ExpenseTracker.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider, Text, useTheme } from 'react-native-paper';
import ExpenseList from './ExpenseList';
import ExpenseFilter from './ExpenseFilter';
import ExpenseForm from './ExpenseForm';
import ExpenseDialog from './ExpenseDialog';
import FloatingButton from './FloatingButton';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, setExpenses } from '../store/expenseSlice';
import { Expense, ExpenseWithId, Medium } from '../types';
import { addMedium, setMediums } from '../store/mediumSlice';
import { addExpenseWithSQLite } from '../store/expenseThunks';
import { addMediumWithSQLite } from '../store/mediumThunks';
import { loadInitialExpensesFromSQLite, loadInitialMediumFromSQLite } from '../database';
import DateRangePicker from './DateRangePicker';
import { useDefaultMonthDates } from '../hooks/useDefaultMonthDates';


const applyFilters = (expenses: ExpenseWithId[], startDate: Date | null, endDate: Date | null, medium: string) => {
  let newFilteredExpenses: ExpenseWithId[] = [...expenses];
  if (startDate && endDate) {
    newFilteredExpenses = newFilteredExpenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startDate && expenseDate <= endDate;
    });
  }
  if (medium) {
    newFilteredExpenses = newFilteredExpenses.filter((expense) => expense.medium === medium);
  }
  return newFilteredExpenses;
};


const ExpenseTracker: React.FC = () => {
  const dispatch = useDispatch();  
  const expenses = useSelector((state: any) => state.expenses.expenses);
  const mediums = useSelector((state: any) => state.mediums.mediums);  
  const [filteredMedium, setFilteredMedium] = useState<string>('');
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [ filteredExpenses, setFilteredExpenses ] = useState<ExpenseWithId[]>([]);
  const theme = useTheme();
  const [ defaultStartDate, defaultEndDate ] = useDefaultMonthDates();

  useEffect(()=> {
    (async () => {
      const expenses = await loadInitialExpensesFromSQLite();
      const mediums = await loadInitialMediumFromSQLite();
      dispatch(setExpenses(expenses));
      dispatch(setMediums(mediums));
      setStartDate(defaultStartDate);
      setEndDate(defaultEndDate);
    })();
  }, [])

  useEffect(() => {
    let newFilteredExpenses: ExpenseWithId[] = [...expenses];
    if(startDate && endDate){
      newFilteredExpenses = expenses.filter((expense: Expense) => new Date(expense.date) >= startDate && new Date(expense.date) <= endDate);
      newFilteredExpenses.sort((a: Expense, b: Expense) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    if(filteredMedium){
      newFilteredExpenses = newFilteredExpenses.filter((expense: Expense) => expense.medium === filteredMedium);
    }
    setFilteredExpenses(newFilteredExpenses);
  }, [startDate, endDate, filteredMedium, expenses]);

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

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={{ alignItems: 'center', flexDirection: 'row' }} >
          <ExpenseFilter
            mediums={mediums?.map((medium: Medium) => medium.medium) || [] }
            selectedMedium={filteredMedium}
            onSelectMedium={handleFilterChange}
          />
          <DateRangePicker defaultStartDate={defaultStartDate} defaultEndDate={defaultEndDate} onDateRangeSelected={(startDate: Date, endDate: Date) => {setStartDate(startDate); setEndDate(endDate);}} />
        </View>
        <ExpenseList expenses={filteredExpenses} />
        <Text style={{textAlign: 'center', fontSize: 30, color: theme.colors.primary, paddingTop: 20 }} >Total: $ {filteredExpenses.reduce((acc:number,cv:Expense) => acc + cv.amount, 0 )}</Text>
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
