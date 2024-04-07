// expenseSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';
import { Expense } from '../types'; // Import Expense interface

interface ExpenseState {
  expenses: Expense[];
}

const initialState: ExpenseState = {
  expenses: [],
};

export const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.expenses = action.payload;
    },
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
    }
  },
});

export const selectExpenses = (state: RootState) => state.expenses.expenses;

export const { setExpenses, addExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
