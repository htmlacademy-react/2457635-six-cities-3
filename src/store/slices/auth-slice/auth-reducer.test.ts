import { AuthorizationStatus, NameSpace } from '../../../constants';
import { AuthSlice } from '../../../types/models';
import { getCurrentAuth } from './auth-reducer';

describe('Auth reducer', () => {
  it('should return authorization status from state', () => {
    const authStatus = AuthorizationStatus.Auth;
    const state: AuthSlice = { authStatus };

    const result = getCurrentAuth({[NameSpace.Auth]: state});

    expect(result).toBe(authStatus);
  });

});
