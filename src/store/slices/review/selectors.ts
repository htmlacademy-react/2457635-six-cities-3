import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../../constants';
import { State } from '../../../types/state';
import { Reviews } from '../../../types/models';

const takeReviews = (state: Pick<State, NameSpace.Review>) => state[NameSpace.Review].reviews;
const takeReviewsLoading = (state: Pick<State, NameSpace.Review>) => state[NameSpace.Review].isReviewLoaded;
const takeReviewsError = (state: Pick<State, NameSpace.Review>) => state[NameSpace.Review].hasReviewError;

export const getReviewsData = createSelector([takeReviews], (reviewsData: Reviews) => reviewsData);
export const getReviewsLoading = createSelector([takeReviewsLoading], (loading: boolean) => loading);
export const getReviewsError = createSelector([takeReviewsError], (hasError: boolean) => hasError);
