import { createSlice } from '@reduxjs/toolkit';
import { ErrorSlice } from '../../../types/models';
import { setError } from './error-action';
import { NameSpace } from '../../../constants';

export const errorSlice = createSlice({
  name: NameSpace.Error,
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
