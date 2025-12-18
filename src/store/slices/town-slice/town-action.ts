import { createAction } from '@reduxjs/toolkit';
import { City } from '../../../types/models';

export const changeTown = createAction<City>('/changeTown');
