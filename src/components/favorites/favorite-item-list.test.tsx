import { fireEvent, render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test/mock-component';
import FavoritesItem from './favorites-item';
import { extractActionsTypes, fakeOffer, fakeStore } from '../../test/mock';
import { addFavoriteOffer } from '../../store/api-actions';
import { replaceOffer } from '../../store/slices/offers-slice/offers-action';
import { setFavoriteOffer } from '../../store/slices/favorite-offers-slice/favorites-offers-action';
import { TestIdMarkups } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Component: FavoritesItem', () => {
  const offer = fakeOffer();
  const store = fakeStore();

  it('should render FavoritesItem when offer is not empty', () => {
    const { withStoreComponent } = withStore(<FavoritesItem offer={offer}/>, {});
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const favoritesItemContainer = screen.getByTestId(TestIdMarkups.FavoritesItemTestId);

    expect(favoritesItemContainer).toBeInTheDocument();
  });

  it ('should dispatch "favoriteOffer", "replaceOffer", "setFavoriteOffer" when user clicked on favorite button' , () => {
    const { withStoreComponent, mockStore } = withStore(<FavoritesItem offer={offer}/>, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      addFavoriteOffer.pending.type,
      replaceOffer.type,
      setFavoriteOffer.type,
    ]);
  });

});
