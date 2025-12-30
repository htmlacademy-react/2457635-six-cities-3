import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { fakeReviews } from '../../mock';
import OfferReviewList from './offer-review-list';

describe('Component: OfferReviewList', () => {
  it('should return correct', () => {
    const expectedReviews = fakeReviews;
    const offerReviewListContainerTestId = 'review-list-container';

    render(<OfferReviewList reviews={expectedReviews}/>);
    const offerReviewListContainer = screen.getByTestId(offerReviewListContainerTestId);

    expect(offerReviewListContainer).toBeInTheDocument();
  });
});
