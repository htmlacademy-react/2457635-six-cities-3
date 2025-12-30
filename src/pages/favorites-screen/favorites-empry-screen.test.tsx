import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test/mock-component';
import FavoritesEmptyScreen from './favorites-empty-screen';
import { AuthorizationStatus } from '../../constants';
import { fakeStore } from '../../test/mock';
import { favoritesEmptyScreenText } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Component: FavoritesEmptyScreen', () => {
  const store = {...fakeStore(),
    AUTH: {
      authStatus: AuthorizationStatus.Auth,
    }
  };

  it('should render FavoritesEmptyScreen when the user is authorized', () => {
    const { withStoreComponent } = withStore(<FavoritesEmptyScreen />, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const result = screen.getByText(favoritesEmptyScreenText);

    expect(result).toBeInTheDocument();
  });
});
