import { describe, it, expect } from 'vitest';
import { UserData } from '../../../types/models';
import { userSlice } from './user-slice';
import { fakeUser } from '../../../mock';
import { dropUserData, setUserData } from './user-action';

describe('Review slice', () => {
  const state = {
    user: {} as UserData,
  };

  it ('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = userSlice.reducer(state, emptyAction);

    expect(result).toEqual(state);
  });

  it ('should return initial state with undefined action', () => {
    const emptyAction = { type: '' };

    const result = userSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(state);
  });

  it('should set user', () => {
    const expectedState = {
      user: fakeUser,
    };

    const result = userSlice.reducer(state, setUserData(fakeUser));

    expect(result).toEqual(expectedState);
  });

  it('should drop user', () => {
    const initialState = {
      user: fakeUser,
    };
    const expectedState = {
      user: {} as UserData,
    };

    const result = userSlice.reducer(initialState, dropUserData);

    expect(result).toEqual(expectedState);
  });

});
