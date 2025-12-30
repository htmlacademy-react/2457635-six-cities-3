import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test/mock-component';
import { CurrentOffer } from '../../types/models';
import { fakeStore } from '../../test/mock';
import { MemoryHistory, createMemoryHistory } from 'history';
import { TestIdMarkups } from '../../test/testid-markup';
import { Route, Routes } from 'react-router-dom';
import OfferScreen from './offer-screen';
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
        <Route path='/offer/:id' element={<OfferScreen />} />
      </Routes>,
      store
    );
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);

    render(withHistoryComponent);

    const expectedContainer = screen.getByTestId(TestIdMarkups.OfferScreenTestId);

    expect(expectedContainer).toBeInTheDocument();
  });


  it('should not render OfferPage when the current offer is empty ', () => {
    const { withStoreComponent } = withStore(<OfferScreen />, {...store,
      CURRENT_OFFER: {
        currentOffer: null as unknown as CurrentOffer,
        isCurrentOfferLoaded: false,
        hasCurrentOfferError: false,
      },
    });
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const expectedContainer = screen.queryByTestId(TestIdMarkups.OfferScreenTestId);

    expect(expectedContainer).not.toBeInTheDocument();

  });

});
