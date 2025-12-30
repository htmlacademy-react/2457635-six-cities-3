import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { fakeReview } from '../../mock';
import OfferReview from './offer-review';

describe('Component: OfferReviewList', () => {
  it('should return correct', () => {
    const expectedReview = fakeReview();
    const offerReviewContainerTestId = 'review-container';

    render(<OfferReview currentReview={expectedReview}/>);
    const offerReviewContainer = screen.getByTestId(offerReviewContainerTestId);
    const reviewName = screen.getByText(expectedReview.user.name);
    const reviewComment = screen.getByText(expectedReview.comment);

    expect(offerReviewContainer).toBeInTheDocument();
    expect(reviewComment).toBeInTheDocument();
    expect(reviewName).toBeInTheDocument();
  });
});
