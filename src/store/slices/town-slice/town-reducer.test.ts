import { describe, expect, it } from 'vitest';
import { CITIES, NameSpace } from '../../../constants';
import { getCity, getCityName } from './town-reducer';

describe('Review reducer', () => {
  it('should return city', () => {
    const state = {
      [NameSpace.Town]: {
        currentCity: CITIES[1],
      }
    };
    const expectedState = CITIES[1];

    const result = getCity(state);

    expect(result).toBe(expectedState);

  });

  it('should return city name', () => {
    const state = {
      [NameSpace.Town]: {
        currentCity: CITIES[1],
      }
    };
    const expectedState = CITIES[1].name;

    const result = getCityName(state);

    expect(result).toBe(expectedState);

  });
});
