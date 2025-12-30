import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import { fakeFeautures } from '../../mock';
import OfferFeautures from './offer-feautures';

describe('Component: OfferFeautures', () => {
  it('should render correct', () => {
    const expectFeautures = fakeFeautures;
    const feauturesContanerTestId = 'feautures-container';
    const feauturesItemTestId = 'feautures';
    const feauturesCount = 3;

    render(<OfferFeautures bedrooms={expectFeautures.bedrooms} type={expectFeautures.type} maxAdults={expectFeautures.maxAdults} />);
    const feauturesContainer = screen.getByTestId(feauturesContanerTestId);
    const feauturesItemContainer = screen.getAllByTestId(feauturesItemTestId);

    expect(feauturesContainer).toBeInTheDocument();
    expect(feauturesItemContainer.length).toBe(feauturesCount);


  });
});
