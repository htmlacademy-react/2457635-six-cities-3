import { createSlice } from '@reduxjs/toolkit';
import { ErrorSlice } from '../../../types/models';

import { setError } from './error-action';

export const errorSlice = createSlice({
  name: 'error',
  initialState: {
    error: null as ErrorSlice,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setError, (state, action) => {
        state.error = action.payload;
      });
  }
});
