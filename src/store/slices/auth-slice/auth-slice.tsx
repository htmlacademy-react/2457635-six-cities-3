import { createSlice } from '@reduxjs/toolkit';
import { requireAuthorization } from '../../action';
import { AuthorizationStatus } from '../../../constants';

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
