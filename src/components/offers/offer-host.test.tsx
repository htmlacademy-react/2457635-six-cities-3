import { describe, it, expect } from 'vitest';
import { render, screen} from '@testing-library/react';
import { fakeDescription, fakeHost } from '../../mock';
import OfferHost from './offer-host';

describe('Component: OfferHost', () => {
  it('should return correct', () => {
    const expectedHost = fakeHost;
    const expectedDescription = fakeDescription;
    const hostContainerTestId = 'host-container';

    render(<OfferHost host={expectedHost} description={expectedDescription}/>);
    const name = screen.getByText(fakeHost.name);
    const description = screen.getByText(fakeDescription);
    const hostContainer = screen.getByTestId(hostContainerTestId);

    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(hostContainer).toBeInTheDocument();
  });
});
