import { createSelector } from '@reduxjs/toolkit';
import { AuthStatus, CommonSlice } from '../../../types/models';

const currentAuth = (state: CommonSlice) => state.auth.authStatus;

export const getCurrentAuth = createSelector([currentAuth], (auth : AuthStatus) => auth);
