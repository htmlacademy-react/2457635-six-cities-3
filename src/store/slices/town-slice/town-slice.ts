import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CITIES, NameSpace } from '../../../constants';
import { City } from '../../../types/models';

export const townsSlice = createSlice({
  name: NameSpace.Town,
  initialState: {
    currentCity: CITIES[1],
  },
  reducers: {
    changeTown: (state, action: PayloadAction<City>) => {
      state.currentCity = action.payload;
    }
  },
});

export const {changeTown} = townsSlice.actions;
