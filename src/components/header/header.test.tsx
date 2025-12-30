import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test/mock-component';
import Header from './header';
import { fakeStore, fakeUser } from '../../test/mock';
import { TestIdMarkups } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Component: Header', () => {
  const store = {...fakeStore(),
    USER: {
      user: fakeUser,
    },
  };

  it('should render Header', () => {
    const { withStoreComponent } = withStore(<Header />, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const headerContainer = screen.getByTestId(TestIdMarkups.HeaderTestId);

    expect(headerContainer).toBeInTheDocument();
  });

});
