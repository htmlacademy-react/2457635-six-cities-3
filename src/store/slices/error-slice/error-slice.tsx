import { createSlice } from '@reduxjs/toolkit';
import { setError } from '../../action';
import { ErrorSlice } from '../../../types/models';


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
