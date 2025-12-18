import { createSelector } from '@reduxjs/toolkit';
import { CommonSlice, ErrorSlice } from '../../../types/models';

const currentError = (state: CommonSlice) => state.error.error;

export const getCurrentError = createSelector([currentError], (error: ErrorSlice) => error);
