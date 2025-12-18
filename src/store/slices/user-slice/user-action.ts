import { createAction } from '@reduxjs/toolkit';
import { UserData } from '../../../types/models';

export const setUserData = createAction<UserData>('user/setData');
export const dropUserData = createAction('user/dropData');
