// src/store/rootReducer.ts

import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import expenseReducer from './expenseSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expenseReducer,
  // Add other reducers here if needed
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
