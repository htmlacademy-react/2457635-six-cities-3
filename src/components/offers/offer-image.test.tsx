import { render, screen } from '@testing-library/react';
import { fakeImages } from '../../test/mock';
import OfferImage from './offer-image';
import { TestIdMarkups } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Component: OfferImage', () => {
  it('should render OfferImage', () => {
    const expectedImage = fakeImages[0];

    render(<OfferImage image={expectedImage}/>);
    const offerImageContainer = screen.getByTestId(TestIdMarkups.OfferImageTestId);

    expect(offerImageContainer).toBeInTheDocument();
  });
});
