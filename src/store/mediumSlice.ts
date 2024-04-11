// mediumSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';
import { Medium } from '../types'; // Import Medium interface

interface MediumState {
  mediums: Medium[];
}

const initialState: MediumState = {
  mediums: [],
};

export const mediumSlice = createSlice({
  name: 'mediums',
  initialState,
  reducers: {
    setMediums: (state, action: PayloadAction<Medium[]>) => {
      state.mediums = action.payload;
    },
    addMedium: (state, action: PayloadAction<Medium>) => {
      state.mediums.push(action.payload);
      console.log(state.mediums);
    },
    deleteAMedium: (state, action: PayloadAction<string>) => {
      state.mediums = state.mediums.filter((medium) => medium.medium !== action.payload);
    },
    deleteAllMedium: (state) => {
      state.mediums = [];
    }
  },
});

export const selectMediums = (state: RootState) => state.mediums.mediums;

export const { setMediums, addMedium, deleteAMedium, deleteAllMedium } = mediumSlice.actions;

export default mediumSlice.reducer;
