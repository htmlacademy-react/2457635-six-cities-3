import { createSelector } from '@reduxjs/toolkit';
import { SortTypes } from '../../../types/models';
import { State } from '../../../types/state';
import { NameSpace } from '../../../constants';

export const currentSort = (state: Pick<State, NameSpace.Sorting>) => state[NameSpace.Sorting].sorting;

export const getCurrentSort = createSelector([currentSort], (sort: SortTypes) => sort);
