// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import expenseReducer from './expenseSlice';
import mediumReducer from './mediumSlice'; // Import mediumReducer

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expenseReducer,
  mediums: mediumReducer, // Add mediumReducer
  // Add other reducers here if needed
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
