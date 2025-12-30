import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { fakeGoods } from '../../mock';
import OfferOption from './offer-option';

describe('Component: OfferOption', () => {
  it('should return correct', () => {
    const expectedOption = fakeGoods[0];
    const offerOptionContainerTestId = 'option-container';

    render(<OfferOption option={expectedOption}/>);
    const offerOptionContainer = screen.getByTestId(offerOptionContainerTestId);
    const offerOption = screen.getByText(expectedOption);

    expect(offerOptionContainer).toBeInTheDocument();
    expect(offerOption).toBeInTheDocument();
  });
});
