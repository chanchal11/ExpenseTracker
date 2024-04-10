// mediumThunks.ts
import { createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import { addMedium, deleteAMedium } from './mediumSlice';
import { Medium } from '../types';
import { deleteAMediumFromDatabase, saveMediumToSQLite } from '../database';

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

export const deleteMedium: any = (medium: string) => async (dispatch: Dispatch) => {
  await deleteAMediumFromDatabase(medium);
  dispatch(deleteAMedium(medium));
};