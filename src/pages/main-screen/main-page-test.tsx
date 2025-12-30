import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test/mock-component';
import { AuthorizationStatus } from '../../constants';
import { MainPage } from './main-page';
import { fakeStore } from '../../test/mock';
import { TestIdMarkups } from '../../test/testid-markup';

describe('Component: MainPage', () => {
  const store = {...fakeStore(),
    AUTH: {
      authStatus: AuthorizationStatus.Auth,
    },
    OFFERS: {
      offers: [],
      isOffersLoaded: false,
    },
    CURRENT_CARD: {
      currentCard: '',
    }
  };

  it('should render MainPage', () => {
    const { withStoreComponent } = withStore(<MainPage />, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const mainContainer = screen.getByTestId(TestIdMarkups.MainScreenTestId);

    expect(mainContainer).toBeInTheDocument();
  });
});
