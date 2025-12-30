import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test/mock-component';
import LoginScreen from './login-screen';
import userEvent from '@testing-library/user-event';
import { TestIdMarkups } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Component: LoginScreen', () => {
  it('should render LoginScreen', () => {
    const { withStoreComponent } = withStore(<LoginScreen />, {});
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const loginContainer = screen.getByTestId(TestIdMarkups.LoginTestId);

    expect(loginContainer).toBeInTheDocument();
  });

  it('should render correctly when the user enter login and password', async() => {
    const loginValue = 'Valentin';
    const passwordValue = '12345';
    const { withStoreComponent } = withStore(<LoginScreen />, {});
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    await userEvent.type(screen.getByTestId(TestIdMarkups.EmailTestId), loginValue);
    await userEvent.type(screen.getByTestId(TestIdMarkups.PasswordTestId), passwordValue);

    expect(screen.getByDisplayValue(loginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(passwordValue)).toBeInTheDocument();
  });
});
