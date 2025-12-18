import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../../constants';
import { requireAuthorization } from './auth-action';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authStatus: AuthorizationStatus.Unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requireAuthorization, (state, action) => {
        state.authStatus = action.payload;
      });
  }
});
