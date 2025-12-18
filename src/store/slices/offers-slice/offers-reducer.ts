import { createSelector } from '@reduxjs/toolkit';
import { CommonSlice, CurrentOffer, Offers, Reviews } from '../../../types/models';

export const allOffers = (state: CommonSlice) => state.offers.offers;
const currentLoadingStatus = (state: CommonSlice) => state.offers.isOffersLoaded;
const currentOffer = (state: CommonSlice) => state.offers.currentOffer;
const reviews = (state: CommonSlice) => state.offers.reviews;

export const getAllOffers = createSelector([allOffers], (allCurrentOffers: Offers) => allCurrentOffers);
export const favoriteOffers = createSelector([allOffers], (offersData: Offers) => offersData.filter((offer) => offer.isFavorite));
export const getCurrentOffer = createSelector([currentOffer], (offer: CurrentOffer) => offer);
export const getReviewsData = createSelector([reviews], (reviewsData: Reviews) => reviewsData);
export const getCurrentLoadingStatus = createSelector([currentLoadingStatus], (loadingStatus: boolean) => loadingStatus);
