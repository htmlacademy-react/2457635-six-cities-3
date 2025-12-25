import { createSlice } from '@reduxjs/toolkit';
import { CurrentOffer } from '../../../types/models';
import { getDataCurrentOffer } from '../../api-actions';
import { NameSpace } from '../../../constants';
import { setCurrentOfferFavorite } from './current-offer-action';

export const currentOfferSlice = createSlice({
  name: NameSpace.CurrentOffer,
  initialState: {
    currentOffer: {} as CurrentOffer,
    isCurrentOfferLoaded: false,
    hasCurrentOfferError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataCurrentOffer.pending, (state) => {
        state.isCurrentOfferLoaded = true;
        state.hasCurrentOfferError = false;
      })
      .addCase(getDataCurrentOffer.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.hasCurrentOfferError = false;
      })
      .addCase(getDataCurrentOffer.rejected, (state) => {
        state.isCurrentOfferLoaded = false;
        state.hasCurrentOfferError = true;
      })
      .addCase(setCurrentOfferFavorite, (state, action) => {
        state.currentOffer.isFavorite = action.payload;
      });
  },
});
