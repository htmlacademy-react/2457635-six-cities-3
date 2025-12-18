import { createSlice } from '@reduxjs/toolkit';
import { loadData, setDataLoadingStatus, setCurrentOffer, setReviews } from '../../action';
import { CurrentOffer, Offers, Reviews } from '../../../types/models';


export const offersSlice = createSlice({
  name: 'offers',
  initialState: {
    offers: [] as Offers,
    isOffersLoaded: false,
    currentOffer: null as unknown as CurrentOffer,
    reviews: [] as Reviews,
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
