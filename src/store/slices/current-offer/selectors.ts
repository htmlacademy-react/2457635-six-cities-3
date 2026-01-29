import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../../constants';
import { CurrentOffer, Offers } from '../../../types/models';
import { State } from '../../../types/state';

export const takeCurrentOffer = (state: Pick<State, NameSpace.CurrentOffer>) => state[NameSpace.CurrentOffer].currentOffer;
export const takeNearOffers = (state: Pick<State, NameSpace.CurrentOffer>) => state[NameSpace.CurrentOffer].nearOffers;
export const takeCurrentOfferLoading = (state: Pick<State, NameSpace.CurrentOffer>) => state[NameSpace.CurrentOffer].isCurrentOfferLoaded;
export const takeCurrentOfferError = (state: Pick<State, NameSpace.CurrentOffer>) => state[NameSpace.CurrentOffer].hasCurrentOfferError;
export const takeNearOffersLoading = (state: Pick<State, NameSpace.CurrentOffer>) => state[NameSpace.CurrentOffer].isNearOffersLoading;
export const takeNearOffersError = (state: Pick<State, NameSpace.CurrentOffer>) => state[NameSpace.CurrentOffer].hasNearOffersError;
export const getCurrentOffer = createSelector([takeCurrentOffer], (offer: CurrentOffer) => offer);
export const getNearOffers = createSelector([takeNearOffers], (offers: Offers) => offers);
export const getCurrentOfferLoading = createSelector([takeCurrentOfferLoading], (loading: boolean) => loading);
export const getCurrentOfferError = createSelector([takeCurrentOfferError], (hasError: boolean) => hasError);
export const getNearOffersLoading = createSelector([takeNearOffersLoading], (loading: boolean) => loading);
export const getNearOffersError = createSelector([takeNearOffersError], (hasError: boolean) => hasError);
