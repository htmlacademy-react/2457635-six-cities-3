import { createSelector } from '@reduxjs/toolkit';
import { ErrorSlice } from '../../../types/models';
import { State } from '../../../types/state';
import { NameSpace } from '../../../constants';

const currentError = (state: State) => state[NameSpace.Error].error;

export const getCurrentError = createSelector([currentError], (error: ErrorSlice) => error);
