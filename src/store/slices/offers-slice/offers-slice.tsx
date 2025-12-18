import { createSlice } from '@reduxjs/toolkit';
import { CurrentOffer, Offers, Reviews } from '../../../types/models';
import { loadData, setCurrentOffer, setDataLoadingStatus, setReviews } from './offers-action';


export const offersSlice = createSlice({
  name: 'offers',
  initialState: {
    offers: [] as Offers,
    isOffersLoaded: false,
    currentOffer: {} as CurrentOffer,
    reviews: null as unknown as Reviews,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadData, (state, action) => {
        state.offers = action.payload;
      })
      .addCase(setDataLoadingStatus, (state, action) => {
        state.isOffersLoaded = action.payload;
      })
      .addCase(setCurrentOffer, (state, action) => {
        state.currentOffer = action.payload;
      })
      .addCase(setReviews, (state, action) => {
        state.reviews = action.payload;
      });
  },
});
