import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test/mock-component';
import MainEmptyScreen from './main-empty-screen';
import { AuthorizationStatus } from '../../constants';
import { fakeStore } from '../../test/mock';
import { TestIdMarkups } from '../../test/testid-markup';
import '@testing-library/jest-dom';


describe('Component: MainEmptyScreen', () => {
  const store = {...fakeStore(),
    AUTH: {
      authStatus: AuthorizationStatus.Auth,
    },
    OFFERS: {
      offers: [],
      isOffersLoaded: false,
    },
  };

  it('should render MainEmptyScreen', () => {
    const { withStoreComponent } = withStore(<MainEmptyScreen />, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const mainContainer = screen.getByTestId(TestIdMarkups.MainEmptyTestId);

    expect(mainContainer).toBeInTheDocument();
  });
});
