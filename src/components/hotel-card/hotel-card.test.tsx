import { fireEvent, render, screen } from '@testing-library/react';
import { AuthorizationStatus } from '../../constants';
import { extractActionsTypes, fakeOffer } from '../../test/mock';
import { withHistory, withStore } from '../../test/mock-component';
import { HotelCard } from './hotel-card';
import { addFavoriteOffer } from '../../store/api-actions';
import { replaceOffer } from '../../store/slices/offers-slice/offers-action';
import { TestIdMarkups } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Component: HotelCard', () => {
  const offer = fakeOffer();
  const store = {
    AUTH: {
      authStatus: AuthorizationStatus.Auth,
    }
  };

  it('should render HotelCard', () => {
    const { withStoreComponent } = withStore(<HotelCard offer={offer}/>, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const container = screen.getByTestId(TestIdMarkups.HotelCardTestId);

    expect(container).toBeInTheDocument();
  });

  it('should dispatch "addFavoriteOffer", "replaceOffer" when the authorized user clicked on favorite button', () => {
    const { withStoreComponent, mockStore } = withStore(<HotelCard offer={offer}/>, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      addFavoriteOffer.pending.type,
      replaceOffer.type,
    ]);
  });

  it('should redirect to LoginScreen ', () => {
    const { withStoreComponent } = withStore(<HotelCard offer={offer}/>, {...store, AUTH: {authStatus:AuthorizationStatus.NoAuth}});
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const container = screen.queryByText(TestIdMarkups.HotelCardTestId);

    expect(container).not.toBeInTheDocument();
  });
});
