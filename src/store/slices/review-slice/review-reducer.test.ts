import { NameSpace } from '../../../constants';
import { Reviews } from '../../../types/models';
import { getReviewsData } from './review-reducer';
import { fakeReviews } from '../../../test/mock';

describe('Review reducer', () => {
  it('should return reviews as null', () => {
    const state = {
      [NameSpace.Review]: {
        reviews: null as unknown as Reviews,
        isReviewLoaded: false,
        hasReviewError: false,
      }
    };
    const expectedState = null;

    const result = getReviewsData(state);

    expect(result).toBe(expectedState);

  });

  it('should return reviews', () => {
    const state = {
      [NameSpace.Review]: {
        reviews: fakeReviews,
        isReviewLoaded: false,
        hasReviewError: false,
      }
    };
    const expectedState = fakeReviews;

    const result = getReviewsData(state);

    expect(result).toBe(expectedState);

  });
});
