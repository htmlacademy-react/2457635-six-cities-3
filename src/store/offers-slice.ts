import { createSlice } from '@reduxjs/toolkit';
import { OFFERS_DATA } from '../mocks/offers';
import { offers } from './action';


export const offersSlice = createSlice({
  name: 'offers',
  initialState: {
    offers: OFFERS_DATA,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(offers, (state) => {
        state.offers = OFFERS_DATA;
      });
  },
});
