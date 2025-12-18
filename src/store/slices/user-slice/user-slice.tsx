import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '../../../types/models';
import { dropUserData, setUserData } from './user-action';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {} as UserData,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setUserData, (state, action) => {
        state.user = action.payload;
      })
      .addCase(dropUserData, (state) => {
        state.user = {} as UserData;
      });
  }
});
