import { screen, render } from '@testing-library/react';
import { fakeFeautures } from '../../test/mock';
import OfferFeautures from './offer-feautures';
import { TestIdMarkups } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Component: OfferFeautures', () => {
  it('should render OfferFeautures', () => {
    const expectFeautures = fakeFeautures;
    const feauturesCount = 3;

    render(<OfferFeautures bedrooms={expectFeautures.bedrooms} type={expectFeautures.type} maxAdults={expectFeautures.maxAdults} />);
    const feauturesContainer = screen.getByTestId(TestIdMarkups.FeauturesTestId);
    const feauturesItemContainer = screen.getAllByTestId(TestIdMarkups.FeauturesItemTestId);

    expect(feauturesContainer).toBeInTheDocument();
    expect(feauturesItemContainer.length).toBe(feauturesCount);


  });
});
