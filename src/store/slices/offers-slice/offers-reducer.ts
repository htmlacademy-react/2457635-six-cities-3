import { createSelector } from '@reduxjs/toolkit';
import { Offers } from '../../../types/models';
import { State } from '../../../types/state';
import { NameSpace } from '../../../constants';

export const allOffers = (state: State) => state[NameSpace.Offers].offers;
const currentLoadingStatus = (state: State) => state[NameSpace.Offers].isOffersLoaded;

export const getAllOffers = createSelector([allOffers], (allCurrentOffers: Offers) => allCurrentOffers);
export const favoriteOffers = createSelector([allOffers], (offersData: Offers) => offersData.filter((offer) => offer.isFavorite));
export const getCurrentLoadingStatus = createSelector([currentLoadingStatus], (loadingStatus: boolean) => loadingStatus);
