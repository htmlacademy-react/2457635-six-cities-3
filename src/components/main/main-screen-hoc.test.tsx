import { render, screen } from '@testing-library/react';
import { fakeStore } from '../../test/mock';
import { withHistory, withStore } from '../../test/mock-component';
import { MainScreen } from './main-screen-hoc';
import { TestIdMarkups } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Component: MainScreen', () => {
  const store = fakeStore();

  it('should render MainScreen when offers is not empty', () => {
    const { withStoreComponent } = withStore(<MainScreen />, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);

    expect(screen.getByTestId(TestIdMarkups.MainScreenTestId)).toBeInTheDocument();
  });

  it('should not render MainScreen when offers is empty', () => {
    const { withStoreComponent } = withStore(<MainScreen />, {...store,
      OFFERS: {
        offers: [],
        isOffersLoaded: false,
      }});
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);

    expect(screen.queryByTestId(TestIdMarkups.MainScreenTestId)).not.toBeInTheDocument();
  });
});
