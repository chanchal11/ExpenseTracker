// expenseThunks.ts
import { createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import { addExpense, clearDataAction, clearDataExceptCurrentMonthAction } from './expenseSlice';
import { clearAllDataFromDatabase, clearDataExceptCurrentMonthFromDatabase, deleteAllMediumFromDatabase, saveExpenseToSQLite } from '../database'; // Define function to save expense to SQLite
import { Expense } from '../types';
import { deleteAllMedium } from './mediumSlice';

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

export const clearDataExceptCurrentMonth: any = () => async (dispatch: Dispatch) => {
    await clearDataExceptCurrentMonthFromDatabase();
    dispatch(clearDataExceptCurrentMonthAction());
  };
  
  export const clearData: any = () => async (dispatch: Dispatch) => {
    await clearAllDataFromDatabase();
    await deleteAllMediumFromDatabase();
    dispatch(clearDataAction());
    dispatch(deleteAllMedium());
  };