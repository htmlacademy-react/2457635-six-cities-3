import { createSlice } from '@reduxjs/toolkit';
import { SORT_TYPES } from '../../../constants';
import { setSorting } from '../../action';

export const sortingSlice = createSlice({
  name: 'sorting',
  initialState: {
    sorting: SORT_TYPES[0],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setSorting, (state, action) => {
        state.sorting = action.payload;
      });
  },
});
