import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../../constants';
import { State } from '../../../types/state';
import { Offers } from '../../../types/models';

const favoriteOffers = (state: State) => state[NameSpace.FavoriteOffers].favoriteOffers;

export const getAllFavoriteOffers = createSelector([favoriteOffers], (offers: Offers) => offers);
