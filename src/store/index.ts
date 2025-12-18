import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { offersSlice } from './slices/offers-slice/offers-slice';
import { townsSlice } from './slices/town-slice/town-slice';
import { sortingSlice } from './slices/sorting-slice/sorting-slice';
import { createAPI } from '../services/api';
import { authSlice } from './slices/auth-slice/auth-slice';
import { errorSlice } from './slices/error-slice/error-slice';

import { userSlice } from './slices/user-slice/user-slice';
import { redirect } from './middlewares/redirect';

const api = createAPI();

export const rootReducer = combineReducers({
  offers: offersSlice.reducer,
  towns: townsSlice.reducer,
  sorting: sortingSlice.reducer,
  auth: authSlice.reducer,
  error: errorSlice.reducer,
  user: userSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    }).concat(redirect)
});
