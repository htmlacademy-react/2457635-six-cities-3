import { describe, it, expect } from 'vitest';
import { CITIES } from '../../../constants';
import { changeTown, townsSlice } from './town-slice';

describe('Review slice', () => {
  const state = {
    currentCity: CITIES[1],
  };

  it ('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = townsSlice.reducer(state, emptyAction);

    expect(result).toEqual(state);
  });

  it ('should return initial state with undefined action', () => {
    const emptyAction = { type: '' };

    const result = townsSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(state);
  });

  it('should change new city', () => {
    const expectedState = {
      currentCity: CITIES[2],
    };

    const result = townsSlice.reducer(state, changeTown(CITIES[2]));

    expect(result).toEqual(expectedState);
  });

});
