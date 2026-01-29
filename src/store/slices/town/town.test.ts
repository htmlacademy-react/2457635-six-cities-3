import { CITIES } from '../../../constants';
import { changeTown, town } from './town';

describe('Town slice', () => {
  const state = {
    currentCity: CITIES[0],
  };

  it ('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = town.reducer(state, emptyAction);

    expect(result).toEqual(state);
  });

  it ('should return initial state with undefined action', () => {
    const emptyAction = { type: '' };

    const result = town.reducer(undefined, emptyAction);

    expect(result).toEqual(state);
  });
  it('should change new city', () => {
    const expectedState = {
      currentCity: CITIES[2],
    };

    const result = town.reducer(state, changeTown(CITIES[2]));

    expect(result).toEqual(expectedState);
  });
});
