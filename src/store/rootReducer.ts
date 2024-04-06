// src/store/rootReducer.ts

import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here if needed
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
