import { createSelector } from '@reduxjs/toolkit';
import { Offers } from '../../../types/models';
import { State } from '../../../types/state';
import { NameSpace } from '../../../constants';

export const allOffers = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].offers;
const currentLoadingStatus = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].isOffersLoaded;

export const getAllOffers = createSelector([allOffers], (allCurrentOffers: Offers) => allCurrentOffers);
export const favoriteOffers = createSelector([allOffers], (offersData: Offers) => offersData.filter((offer) => offer.isFavorite));
export const getCurrentLoadingStatus = createSelector([currentLoadingStatus], (loadingStatus: boolean) => loadingStatus);
