import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { fakeImages } from '../../mock';
import OfferImageList from './offer-image-list';

describe('Component: OfferImageList', () => {
  it('should return correct', () => {
    const expectedImages = fakeImages;
    const offerImageListContainerTestId = 'offer-image-list-container';

    render(<OfferImageList images={expectedImages}/>);
    const offerImageListContainer = screen.getByTestId(offerImageListContainerTestId);

    expect(offerImageListContainer).toBeInTheDocument();
  });
});
