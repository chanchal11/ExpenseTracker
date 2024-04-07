// src/store/configureStore.ts

import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { createAsyncThunk, createSlice, isAnyOf, isFulfilled } from '@reduxjs/toolkit';
import { ThunkMiddleware } from 'redux-thunk';

import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});

export default store;