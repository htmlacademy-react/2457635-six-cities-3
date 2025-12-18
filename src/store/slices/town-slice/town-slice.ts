import { createSlice } from '@reduxjs/toolkit';
import { CITIES } from '../../../constants';
import { changeTown } from '../../action';

export const townsSlice = createSlice({
  name: 'towns',
  initialState: {
    currentCity: CITIES[1],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeTown, (state, action) => {
        state.currentCity = action.payload;
      });
  }
});
