import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test/mock-component';
import { fakeStore } from '../../test/mock';
import NearOffers from './near-offers';
import { TestIdMarkups } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Component: NearOffers', () => {
  const store = fakeStore();

  it('should render NearOffers', () => {
    const { withStoreComponent } = withStore(<NearOffers />, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const nearOffersContainer = screen.getByTestId(TestIdMarkups.NearOffersTestId);

    expect(nearOffersContainer).toBeInTheDocument();
  });
});
