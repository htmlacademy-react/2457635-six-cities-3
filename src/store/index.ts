import { configureStore } from '@reduxjs/toolkit';
import { townsSlice, offersSlice } from './reduser';

export const store = configureStore({reducer: {
  offers: offersSlice.reducer,
  towns: townsSlice.reducer,
}});
