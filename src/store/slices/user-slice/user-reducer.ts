import { createSelector } from '@reduxjs/toolkit';
import { UserData } from '../../../types/models';
import { NameSpace } from '../../../constants';
import { State } from '../../../types/state';

const currentUserData = (state: State) => state[NameSpace.User].user;

export const getUserData = createSelector([currentUserData], (user: UserData) => user);
