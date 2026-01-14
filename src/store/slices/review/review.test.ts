import { reviews } from './reviews';
import { Reviews } from '../../../types/models';
import { getReviews } from '../../api-actions';
import { fakeReview, fakeReviews } from '../../../test/mock';
// import { addUserReview, setReviews } from './actions';
import { addUserReview, setReviews } from './action';

describe('Review slice', () => {
  const state = {
    reviews: null as unknown as Reviews,
    isReviewLoaded: false,
    hasReviewError: false,
  };
  it ('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = reviews.reducer(state, emptyAction);

    expect(result).toEqual(state);
  });

  it ('should return initial state with undefined action', () => {
    const emptyAction = { type: '' };

    const result = reviews.reducer(undefined, emptyAction);

    expect(result).toEqual(state);
  });
  it('should return isReviewLoaded as true', () => {
    const initialState = {
      reviews: null as unknown as Reviews,
      isReviewLoaded: false,
      hasReviewError: false,
    };
    const expectedState = {
      reviews: null as unknown as Reviews,
      isReviewLoaded: true,
      hasReviewError: false,
    };

    const result = reviews.reducer(initialState, getReviews.pending);

    expect(result).toEqual(expectedState);
  });
  it('should return fakeOffers', () => {
    const initialState = {
      reviews: null as unknown as Reviews,
      isReviewLoaded: true,
      hasReviewError: false,
    };
    const expectedState = {
      reviews: fakeReviews,
      isReviewLoaded: false,
      hasReviewError: false,
    };

    const result = reviews.reducer(initialState, getReviews.fulfilled(fakeReviews, '', undefined));

    expect(result).toEqual(expectedState);
  });
  it('should return hasReviewError as false', () => {
    const initialState = {
      reviews: null as unknown as Reviews,
      isReviewLoaded: true,
      hasReviewError: false,
    };
    const expectedState = {
      reviews: null as unknown as Reviews,
      isReviewLoaded: false,
      hasReviewError: true,
    };

    const result = reviews.reducer(initialState, getReviews.rejected);

    expect(result).toEqual(expectedState);
  });
  it('should set reviews', () => {
    const initialState = {
      reviews: null as unknown as Reviews,
      isReviewLoaded: false,
      hasReviewError: false,
    };
    const expectedState = {
      reviews: fakeReviews,
      isReviewLoaded: false,
      hasReviewError: false,
    };

    const result = reviews.reducer(initialState, setReviews(fakeReviews));

    expect(result.reviews).toEqual(expectedState.reviews);
  });
  it('should set reviews as null', () => {
    const initialState = {
      reviews: null as unknown as Reviews,
      isReviewLoaded: false,
      hasReviewError: false,
    };
    const expectedState = {
      reviews: null as unknown as Reviews,
      isReviewLoaded: false,
      hasReviewError: false,
    };

    const result = reviews.reducer(initialState, setReviews(null as unknown as Reviews));

    expect(result.reviews).toEqual(expectedState.reviews);
  });
  it('should add user review to reviews', () => {
    const initialState = {
      reviews: fakeReviews,
      isReviewLoaded: false,
      hasReviewError: false,
    };
    const newReview = fakeReview();
    const expectedState = {
      reviews: [...fakeReviews, newReview],
      isReviewLoaded: false,
      hasReviewError: false,
    };

    const result = reviews.reducer(initialState, addUserReview(newReview));

    expect(result.reviews).toEqual(expectedState.reviews);
  });
});
