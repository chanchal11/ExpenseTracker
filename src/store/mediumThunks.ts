// mediumThunks.ts
import { createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import { addMedium } from './mediumSlice';
import { Medium } from '../types'; // Assuming Medium interface is defined in types.ts
import { saveMediumToSQLite } from '../database'; // Define function to save medium to SQLite

// export const addMediumWithSQLite: any = createAsyncThunk(
//   'mediums/addMediumWithSQLite',
//   async (medium: Medium) => {
//     await saveMediumToSQLite(medium);
//     return medium;
//   }
// );

export const addMediumWithSQLite: any = (medium: Medium) => {
  return (dispatch : Dispatch) => {
    saveMediumToSQLite(medium)
      .then(() => {
        dispatch(addMedium(medium));
      })
      .catch((error) => {
        console.error('Error saving medium to SQLite:', error);
      });
  } 
}