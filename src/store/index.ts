import { configureStore } from '@reduxjs/toolkit';
import { offersSlice } from './slices/offers-slice/offers-slice';
import { townsSlice } from './slices/town-slice/town-slice';
import { sortingSlice } from './slices/sorting-slice/sorting-slice';
import { createAPI } from '../services/api';
import { authSlice } from './slices/auth-slice/auth-slice';
import { errorSlice } from './slices/error-slice/error-slice';

const api = createAPI();

export const store = configureStore({
  reducer: {
    offers: offersSlice.reducer,
    towns: townsSlice.reducer,
    sorting: sortingSlice.reducer,
    auth: authSlice.reducer,
    error: errorSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    })
});
