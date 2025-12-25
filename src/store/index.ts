import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { offersSlice } from './slices/offers-slice/offers-slice';
import { townsSlice } from './slices/town-slice/town-slice';
import { sortingSlice } from './slices/sorting-slice/sorting-slice';
import { createAPI } from '../services/api';
import { authSlice } from './slices/auth-slice/auth-slice';
import { errorSlice } from './slices/error-slice/error-slice';
import { userSlice } from './slices/user-slice/user-slice';
import { redirect } from './middlewares/redirect';
import { NameSpace } from '../constants';
import { reviewSlice } from './slices/review-slice/review-slice';
import { currentOfferSlice } from './slices/current-offer/current-offer-slice';
import { currentCardSlice } from './slices/current-card-slice/current-card-slice';
import { favoriteOffersSlice } from './slices/favorite-offers-slice/favorite-offers-slice';

const api = createAPI();

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersSlice.reducer,
  [NameSpace.Town]: townsSlice.reducer,
  [NameSpace.Sorting]: sortingSlice.reducer,
  [NameSpace.Auth]: authSlice.reducer,
  [NameSpace.Error]: errorSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Review]: reviewSlice.reducer,
  [NameSpace.CurrentOffer]: currentOfferSlice.reducer,
  [NameSpace.CurrentCard]: currentCardSlice.reducer,
  [NameSpace.FavoriteOffers]: favoriteOffersSlice.reducer,
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
