import { createSlice } from '@reduxjs/toolkit';

import { Reviews } from '../../../types/models';
import { getReviews } from '../../api-actions';
import { NameSpace } from '../../../constants';
import { addUserReview, setReviews } from './review-action';


export const reviewSlice = createSlice({
  name: NameSpace.Review,
  initialState: {
    reviews: null as unknown as Reviews,
    isReviewLoaded: false,
    hasReviewError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setReviews, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(addUserReview, (state, action) => {
        state.reviews.push(action.payload);
      })
      .addCase(getReviews.pending, (state) => {
        state.isReviewLoaded = true;
        state.hasReviewError = false;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewLoaded = false;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isReviewLoaded = false;
        state.hasReviewError = true;
      });

  },
});
