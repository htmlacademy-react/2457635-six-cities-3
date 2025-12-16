import { configureStore } from '@reduxjs/toolkit';
import { offersSlice } from './offers-slice';
import { townsSlice } from './town-slice';
import { sortingSlice } from './sorting-slice';

export const store = configureStore({reducer: {
  offers: offersSlice.reducer,
  towns: townsSlice.reducer,
  sorting: sortingSlice.reducer,
}});
