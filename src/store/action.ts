import { createAction } from '@reduxjs/toolkit';
import { City, CurrentOffer, Offers, Reviews, SortTypes } from '../types/models';
import { AuthorizationStatus } from '../constants';

export const changeTown = createAction<City>('/changeTown');

export const setSorting = createAction<SortTypes>('/sorting');


export const loadData = createAction<Offers>('data/loadData');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('/setError');

export const setDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');

export const setCurrentOfferId = createAction<string | undefined>('offer/id');

export const setCurrentOffer = createAction<CurrentOffer>('offers/offer');

export const setReviews = createAction<Reviews>('offers/reviews');
