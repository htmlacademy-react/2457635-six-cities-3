import { createSlice } from '@reduxjs/toolkit';
import { CurrentOffer, Offers } from '../../../types/models';
import { getDataCurrentOffer, getNearbyOffers } from '../../api-actions';
import { NameSpace } from '../../../constants';
import { setCurrentOfferFavorite, setNearOfferFavorite } from './actions';

export const currentOffer = createSlice({
  name: NameSpace.CurrentOffer,
  initialState: {
    currentOffer: {} as CurrentOffer,
    isCurrentOfferLoaded: false,
    hasCurrentOfferError: false,
    nearOffers: [] as Offers,
    isNearOffersLoading: false,
    hasNearOffersError: false,
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
        state.isCurrentOfferLoaded = false;
        state.hasCurrentOfferError = false;
      })
      .addCase(getDataCurrentOffer.rejected, (state) => {
        state.isCurrentOfferLoaded = false;
        state.hasCurrentOfferError = true;
      })
      .addCase(getNearbyOffers.pending, (state) => {
        state.isNearOffersLoading = true;
        state.hasNearOffersError = false;
      })
      .addCase(getNearbyOffers.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
        state.isNearOffersLoading = false;
      })
      .addCase(getNearbyOffers.rejected, (state) => {
        state.isNearOffersLoading = false;
        state.hasNearOffersError = true;
      })
      .addCase(setCurrentOfferFavorite, (state, action) => {
        state.currentOffer.isFavorite = action.payload;
      })
      .addCase(setNearOfferFavorite, (state, action) => {
        const target = state.nearOffers.find((offer) => offer.id === action.payload.id);
        if (target) {
          target.isFavorite = action.payload.isFavorite;
        }
      });
  },
});
