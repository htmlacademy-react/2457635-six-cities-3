import { SORT_TYPES } from '../../../constants';
import { setSorting, sortingSlice } from './sorting-slice';

describe('Review slice', () => {
  const state = {
    sorting: SORT_TYPES[0],
  };

  it ('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = sortingSlice.reducer(state, emptyAction);

    expect(result).toEqual(state);
  });

  it ('should return initial state with undefined action', () => {
    const emptyAction = { type: '' };

    const result = sortingSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(state);
  });

  it('should set new sorting', () => {
    const initialState = {
      sorting: SORT_TYPES[0],
    };
    const expectedState = {
      sorting: SORT_TYPES[2],
    };

    const result = sortingSlice.reducer(initialState, setSorting(SORT_TYPES[2]));

    expect(result).toEqual(expectedState);
  });

});
