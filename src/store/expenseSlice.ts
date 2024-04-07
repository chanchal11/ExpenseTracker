// expenseSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  medium: string;
  date: string;
}

export interface Medium {
  id: string;
  medium: string;
}

interface ExpenseState {
  expenses: Expense[];
  mediums: Medium[];
}

const initialState: ExpenseState = {
  expenses: [],
  mediums: [{medium: 'Food', id: '1'}, {medium: 'Utilities', id: '2'}, {medium: 'Entertainment', id: '3'}, {medium: 'Other', id: '4'}],
};

export const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
    },
    addMedium: (state, action: PayloadAction<string>) => {
      if(!(state.mediums.filter((medium: Medium) => medium.medium === action.payload).length > 0)){
       state.mediums.push({medium: action.payload, id: (state.mediums.length + 1).toString()}); 
      }
    }
  },
});

// Selectors
export const selectExpenses = (state: RootState) => state.expenses.expenses;

// Actions
export const { addExpense, addMedium } = expenseSlice.actions;

// Reducer
export default expenseSlice.reducer;


