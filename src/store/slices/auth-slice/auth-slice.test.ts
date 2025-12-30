import { AuthorizationStatus } from '../../../constants';
import { checkAuthAction, loginAction, logoutAction } from '../../api-actions';
import { authSlice } from './auth-slice';

describe('Auth slice', () => {
  it ('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {authStatus: AuthorizationStatus.Auth};

    const result = authSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { authStatus: AuthorizationStatus.Unknown };

    const result = authSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "checkAuthAction.fulfilled" action', () => {
    const initialState = { authStatus: AuthorizationStatus.NoAuth };
    const expectedState = { authStatus: AuthorizationStatus.Auth };

    const result = authSlice.reducer(initialState, checkAuthAction.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "checkAuthAction.rejected" action', () => {
    const initialState = { authStatus: AuthorizationStatus.Auth };
    const expectedState = { authStatus: AuthorizationStatus.NoAuth };

    const result = authSlice.reducer(initialState, checkAuthAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "loginAction.fulfilled" action', () => {
    const initialState = { authStatus: AuthorizationStatus.NoAuth };
    const expectedState = { authStatus: AuthorizationStatus.Auth };

    const result = authSlice.reducer(initialState, loginAction.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "loginAction.rejected" action', () => {
    const initialState = { authStatus: AuthorizationStatus.Auth };
    const expectedState = { authStatus: AuthorizationStatus.NoAuth };

    const result = authSlice.reducer(initialState, loginAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth", with "logoutAction.fulfilled" action', () => {
    const initialState = { authStatus: AuthorizationStatus.Auth };
    const expectedState = { authStatus: AuthorizationStatus.NoAuth };

    const result = authSlice.reducer(initialState, logoutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });
});
