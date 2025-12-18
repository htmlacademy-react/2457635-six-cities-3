import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../constants';

export const setCurrentOfferId = createAction<string | undefined>('offer/id');

export const redirectToRoute = createAction<AppRoute>('data/redirectToRoute');

