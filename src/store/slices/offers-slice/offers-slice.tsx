import { createSlice } from '@reduxjs/toolkit';
import { Offers } from '../../../types/models';
import { fetchOfferAction } from '../../api-actions';
import { NameSpace } from '../../../constants';


export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState: {
    offers: [] as Offers,
    isOffersLoaded: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOffersLoaded = true;
        state.hasError = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoaded = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOffersLoaded = false;
        state.hasError = true;
      });
  },
});
