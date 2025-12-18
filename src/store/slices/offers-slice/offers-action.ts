import { createAction } from '@reduxjs/toolkit';
import { CurrentOffer, Offers, Reviews } from '../../../types/models';

export const loadData = createAction<Offers>('data/loadData');
export const setDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');
export const setCurrentOffer = createAction<CurrentOffer>('offers/offer');
export const setReviews = createAction<Reviews>('offers/reviews');
