import { createSelector } from '@reduxjs/toolkit';
import { UserData } from '../../../types/models';
import { NameSpace } from '../../../constants';
import { State } from '../../../types/state';

const currentUserData = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].user;

export const getUserData = createSelector([currentUserData], (user: UserData) => user);
