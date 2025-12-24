import { createAction } from '@reduxjs/toolkit';
import { Review, Reviews } from '../../../types/models';

export const setReviews = createAction<Reviews>('offers/reviews');
export const addUserReview = createAction<Review>('offers/userReview');
