import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { fakeImages } from '../../mock';
import OfferImage from './offer-image';

describe('Component: OfferImage', () => {
  it('should return correct', () => {
    const expectedImage = fakeImages[0];
    const offerImageContainerTestId = 'offer-image-container';

    render(<OfferImage image={expectedImage}/>);
    const offerImageContainer = screen.getByTestId(offerImageContainerTestId);

    expect(offerImageContainer).toBeInTheDocument();
  });
});
