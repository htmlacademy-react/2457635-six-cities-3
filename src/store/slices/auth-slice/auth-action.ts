import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../../constants';

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
