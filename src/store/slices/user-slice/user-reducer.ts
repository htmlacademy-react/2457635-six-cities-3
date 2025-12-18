import { createSelector } from '@reduxjs/toolkit';
import { CommonSlice, UserData } from '../../../types/models';

const currentUserData = (state: CommonSlice) => state.user.user;

export const getUserData = createSelector([currentUserData], (user: UserData) => user);
