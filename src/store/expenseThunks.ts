// expenseThunks.ts
import { createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import { addExpense } from './expenseSlice';
import { saveExpenseToSQLite } from '../database'; // Define function to save expense to SQLite
import { Expense } from '../types';

// export const addExpenseWithSQLite: any = createAsyncThunk(
//     'expenses/addExpenseWithSQLite',
//     async (expense: Expense) => {
//         await saveExpenseToSQLite(expense);
//         return expense;
//     }
// );


export const addExpenseWithSQLite: any = (expense: Expense) => {
    return (dispatch : Dispatch) => {
        saveExpenseToSQLite(expense)
            .then(() => {
                dispatch(addExpense(expense));
            })
            .catch((error) => {
                console.error('Error saving expense to SQLite:', error);
            });
    } 
}