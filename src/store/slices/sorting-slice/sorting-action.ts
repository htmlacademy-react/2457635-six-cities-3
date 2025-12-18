import { createAction } from '@reduxjs/toolkit';
import { SortTypes } from '../../../types/models';

export const setSorting = createAction<SortTypes>('/sorting');
