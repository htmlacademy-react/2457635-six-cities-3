import { createAction } from '@reduxjs/toolkit';

export const setCurrentOfferFavorite = createAction<boolean>('currentOffer/set');
export const setNearOfferFavorite = createAction<{id: string; isFavorite: boolean}>('currentOffer/near');
