import { render, screen} from '@testing-library/react';
import { fakeDescription, fakeHost } from '../../test/mock';
import OfferHost from './offer-host';
import { TestIdMarkups } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Component: OfferHost', () => {
  it('should render OfferHost', () => {
    const expectedHost = fakeHost;
    const expectedDescription = fakeDescription;

    render(<OfferHost host={expectedHost} description={expectedDescription}/>);
    const name = screen.getByText(fakeHost.name);
    const description = screen.getByText(fakeDescription);
    const hostContainer = screen.getByTestId(TestIdMarkups.HostTestId);

    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(hostContainer).toBeInTheDocument();
  });
});
