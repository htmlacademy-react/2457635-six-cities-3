import { fireEvent, render, screen } from '@testing-library/react';
import { AuthorizationStatus } from '../../constants';
import { extractActionsTypes, fakeStore } from '../../test/mock';
import { withHistory, withStore } from '../../test/mock-component';
import OfferFavoriteButton from './offer-favorite-button';
import { setCurrentOfferFavorite } from '../../store/slices/current-offer/current-offer-action';
import { CurrentOffer } from '../../types/models';
import { addFavoriteOffer } from '../../store/api-actions';
import { replaceOffer } from '../../store/slices/offers-slice/offers-action';
import { TestIdMarkups } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Component: OfferFavoriteButton', () => {
  const store = {...fakeStore(),
    AUTH: {
      authStatus: AuthorizationStatus.Auth,
    },
  };

  it('should render OfferFavoriteButton', () => {

    const { withStoreComponent } = withStore(<OfferFavoriteButton />, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const container = screen.getByTestId(TestIdMarkups.FavoriteButtonTestId);

    expect(container).toBeInTheDocument();
  });

  it('should dispatch "addFavoriteOffer", "replaceOffer", "setCurrentOfferFavorite" when user clicked on favorite button', () => {
    const { withStoreComponent, mockStore } = withStore(<OfferFavoriteButton />, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const button = screen.getByTestId(TestIdMarkups.FavoriteButtonTestId);
    fireEvent.click(button);

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      addFavoriteOffer.pending.type,
      replaceOffer.type,
      setCurrentOfferFavorite.type,
    ]);
  });

  it('should not dispatch when the user is not authorized', () => {
    const { withStoreComponent } = withStore(<OfferFavoriteButton />, fakeStore());
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const container = screen.queryByText(TestIdMarkups.FavoriteButtonTestId);

    expect(container).not.toBeInTheDocument();
  });

  it('should not dispatch when offers is empty', () => {
    const { withStoreComponent } = withStore(<OfferFavoriteButton />, {...store,
      CURRENT_OFFER: {
        currentOffer: {} as CurrentOffer,
        isCurrentOfferLoaded: false,
        hasCurrentOfferError: false,
      }
    });
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const container = screen.queryByText(TestIdMarkups.FavoriteButtonTestId);

    expect(container).not.toBeInTheDocument();
  });
});
