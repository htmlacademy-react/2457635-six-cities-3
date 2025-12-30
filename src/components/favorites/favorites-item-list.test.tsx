import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test/mock-component';
import { fakeOffers, fakeStore } from '../../test/mock';
import { Offers } from '../../types/models';
import { FavoritesItemList } from './favorites-item-list';
import { TestIdMarkups } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Component: FavoritesItemList', () => {
  const offers = fakeOffers;
  const store = {...fakeStore(),
    FAVORITE_OFFERS: {
      favoriteOffers: [] as Offers,
    }
  };

  it('should render FavoritesItemList when offers is not empty', () => {
    const { withStoreComponent } = withStore(<FavoritesItemList offers={offers}/>, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const favoritesItemContainer = screen.getByTestId(TestIdMarkups.FavoritesItemListTestId);

    expect(favoritesItemContainer).toBeInTheDocument();
  });

  it('should not render FavoritesItemList when offers is empty', () => {
    const { withStoreComponent } = withStore(<FavoritesItemList offers={[]}/>, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const favoritesItemContainer = screen.queryByText(TestIdMarkups.FavoritesItemListTestId);

    expect(favoritesItemContainer).not.toBeInTheDocument();
  });
});
