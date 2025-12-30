import { render, screen } from '@testing-library/react';
import LoginMarkup from './login-markup';
import { withHistory, withStore } from '../../test/mock-component';
import { AuthorizationStatus } from '../../constants';
import { fakeStore, fakeUser } from '../../test/mock';
import { TestIdMarkups } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Component: LoginMarkup', () => {
  const store = {...fakeStore(),
    USER: {
      user: fakeUser,
    },
    AUTH: {
      authStatus: AuthorizationStatus.Auth
    }
  };

  it('should render LoginMarkup when the user is not authorized', () => {
    const { withStoreComponent } = withStore(<LoginMarkup />, fakeStore());

    render(withStoreComponent);
    const loginMarkupContainer = screen.queryByText(TestIdMarkups.LoginMarkupTestId);

    expect(loginMarkupContainer).not.toBeInTheDocument();
  });

  it('should render LoginMarkup when the user is authorized', () => {
    const { withStoreComponent } = withStore(<LoginMarkup />, store);

    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const loginMarkupContainer = screen.getByTestId(TestIdMarkups.LoginMarkupTestId);

    expect(loginMarkupContainer).toBeInTheDocument();
  });

});
