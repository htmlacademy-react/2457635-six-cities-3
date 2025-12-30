import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { fakeGoods } from '../../mock';
import OfferOptionList from './offer-option-list';

describe('Component: OfferOptionList', () => {
  it('should return correct', () => {
    const expectedOptions = fakeGoods;
    const offerOptionListContainerTestId = 'option-list-container';

    render(<OfferOptionList goods={expectedOptions}/>);
    const offerOptionListContainer = screen.getByTestId(offerOptionListContainerTestId);

    expect(offerOptionListContainer).toBeInTheDocument();
  });
});
