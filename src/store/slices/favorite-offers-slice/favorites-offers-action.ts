import { createAction } from '@reduxjs/toolkit';
import { Offer, Offers } from '../../../types/models';

export const setFavoriteOffers = createAction<Offers>('offers/favoritesOffers');
export const setFavoriteOffer = createAction<Offer>('offers/favoritesOffers/offer');
