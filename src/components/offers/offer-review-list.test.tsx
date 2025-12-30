import { render, screen } from '@testing-library/react';
import { fakeReviews } from '../../test/mock';
import OfferReviewList from './offer-review-list';
import { TestIdMarkups } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Component: OfferReviewList', () => {
  it('should render OfferReviewList', () => {
    const expectedReviews = fakeReviews;

    render(<OfferReviewList reviews={expectedReviews}/>);
    const offerReviewListContainer = screen.getByTestId(TestIdMarkups.ReviewListTestId);

    expect(offerReviewListContainer).toBeInTheDocument();
  });
});
