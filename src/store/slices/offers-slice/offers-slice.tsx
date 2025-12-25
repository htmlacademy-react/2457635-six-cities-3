import { createSlice } from '@reduxjs/toolkit';
import { Offers } from '../../../types/models';
import { fetchOfferAction } from '../../api-actions';
import { NameSpace } from '../../../constants';
import { replaceOffer } from './offers-action';
import { replaceOffersArray } from '../../../utils';


export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState: {
    offers: [] as Offers,
    isOffersLoaded: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOffersLoaded = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoaded = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOffersLoaded = false;
      })
      .addCase(replaceOffer, (state, action) => {
        state.offers = replaceOffersArray(state.offers, action.payload);
      });
  },
});
