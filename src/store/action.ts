import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/models';

export const changeTown = createAction('/changeTown', (value: City) => ({
  payload: value,
}));

export const offers = createAction('/offers');
