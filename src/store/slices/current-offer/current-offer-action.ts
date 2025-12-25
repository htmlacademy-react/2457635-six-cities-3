import { createAction } from '@reduxjs/toolkit';

export const setCurrentOfferFavorite = createAction<boolean>('currentOffer/set');
