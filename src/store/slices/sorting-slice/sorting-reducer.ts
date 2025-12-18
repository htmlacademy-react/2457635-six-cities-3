import { createSelector } from '@reduxjs/toolkit';
import { CommonSlice, SortTypes } from '../../../types/models';

export const currentSort = (state: CommonSlice) => state.sorting.sorting;

export const getCurrentSort = createSelector([currentSort], (sort: SortTypes) => sort);
