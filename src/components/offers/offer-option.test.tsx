import { render, screen } from '@testing-library/react';
import { fakeGoods } from '../../test/mock';
import OfferOption from './offer-option';
import { TestIdMarkups } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Component: OfferOption', () => {
  it('should render OfferOption', () => {
    const expectedOption = fakeGoods[0];

    render(<OfferOption option={expectedOption}/>);
    const offerOptionContainer = screen.getByTestId(TestIdMarkups.OptionTestId);
    const offerOption = screen.getByText(expectedOption);

    expect(offerOptionContainer).toBeInTheDocument();
    expect(offerOption).toBeInTheDocument();
  });
});
