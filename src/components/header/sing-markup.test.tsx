import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test/mock-component';
import { AuthorizationStatus } from '../../constants';
import SignMarkup from './sign-markup';
import { fakeStore } from '../../test/mock';
import { TestIdMarkups } from '../../test/testid-markup';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom';

describe('Component: SignMarkup', () => {
  const store = {...fakeStore(),
    AUTH: {
      authStatus: AuthorizationStatus.Auth,
    }
  };

  it('should render SignMarkup when the user is not authorized', () => {
    const { withStoreComponent } = withStore(<SignMarkup />, fakeStore());
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const signMarkupContainer = screen.queryByText(TestIdMarkups.SignMarkupTestId);
    const unsignMarkupContainer = screen.getByTestId(TestIdMarkups.UnsignMarkupTestId);

    expect(signMarkupContainer).not.toBeInTheDocument();
    expect(unsignMarkupContainer).toBeInTheDocument();
  });

  it('should render SignMarkup when the user is authorized', () => {
    const { withStoreComponent } = withStore(<SignMarkup />, store);

    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const signMarkupContainer = screen.getByTestId(TestIdMarkups.SignMarkupTestId);
    const unsignMarkupContainer = screen.queryByText(TestIdMarkups.UnsignMarkupTestId);

    expect(signMarkupContainer).toBeInTheDocument();
    expect(unsignMarkupContainer).not.toBeInTheDocument();
  });

});
