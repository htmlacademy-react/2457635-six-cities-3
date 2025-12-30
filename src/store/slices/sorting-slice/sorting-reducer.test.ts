import { describe, expect, it } from 'vitest';
import { NameSpace, SORT_TYPES } from '../../../constants';
import { getCurrentSort } from './sorting-reducer';

describe('Review reducer', () => {
  it('should return reviews as null', () => {
    const state = {
      [NameSpace.Sorting]: {
        sorting: SORT_TYPES[0],
      }
    };
    const expectedState = SORT_TYPES[0];

    const result = getCurrentSort(state);

    expect(result).toBe(expectedState);

  });
});
