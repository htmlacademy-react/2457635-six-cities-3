import { render, screen } from '@testing-library/react';
import { fakeReview } from '../../test/mock';
import OfferReview from './offer-review';
import { TestIdMarkups } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Component: OfferReviewList', () => {
  it('should render OfferReviewList', () => {
    const expectedReview = fakeReview();

    render(<OfferReview currentReview={expectedReview}/>);
    const offerReviewContainer = screen.getByTestId(TestIdMarkups.ReviewTestId);
    const reviewName = screen.getByText(expectedReview.user.name);
    const reviewComment = screen.getByText(expectedReview.comment);

    expect(offerReviewContainer).toBeInTheDocument();
    expect(reviewComment).toBeInTheDocument();
    expect(reviewName).toBeInTheDocument();
  });
});
