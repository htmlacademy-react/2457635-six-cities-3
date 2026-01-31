import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test/mock-component';
import { CurrentOffer } from '../../types/models';
import { fakeStore } from '../../test/mock';
import { MemoryHistory, createMemoryHistory } from 'history';
import { TestIdMarkups } from '../../test/testid-markup';
import { Route, Routes } from 'react-router-dom';
import OfferScreen from './offer-screen';
import { AppRoute } from '../../constants';
import '@testing-library/jest-dom';

describe('Component: OfferScreen', () => {
  let mockHistory: MemoryHistory;
  const store = fakeStore();
  const id = store.CURRENT_OFFER.currentOffer.id;
  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });
  beforeEach(() => {
    mockHistory.push(`/offer/${id}`);
  });
  it('should render OfferPage when the current offer is found among all offers ', () => {
    const { withStoreComponent } = withStore(
      <Routes>
        <Route path={AppRoute.Offer} element={<OfferScreen />} />
      </Routes>,
      store
    );
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);

    render(withHistoryComponent);
    const expectedContainer = screen.getByTestId(TestIdMarkups.OfferScreenTestId);
    const notExpectedContainer = screen.queryByText(TestIdMarkups.NotFoundTestId);

    expect(expectedContainer).toBeInTheDocument();
    expect(notExpectedContainer).not.toBeInTheDocument();
  });


  it('should show NotFoundScreen when current offer has an error', () => {
    const { withStoreComponent } = withStore(
      <Routes>
        <Route path={AppRoute.Offer} element={<OfferScreen />} />
      </Routes>,
      {...store,
        CURRENT_OFFER: {
          currentOffer: {} as CurrentOffer,
          isCurrentOfferLoaded: false,
          hasCurrentOfferError: true,
          nearOffers: [],
          isNearOffersLoading: false,
          hasNearOffersError: false,
        },
      });
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);

    render(withHistoryComponent);
    const notExpectedContainer = screen.queryByTestId(TestIdMarkups.OfferScreenTestId);
    const expectedContainer = screen.getByTestId(TestIdMarkups.NotFoundTestId);

    expect(notExpectedContainer).not.toBeInTheDocument();
    expect(expectedContainer).toBeInTheDocument();
  });

});
