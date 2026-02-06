import { CITIES, NameSpace } from '../../../constants';
import { getCity, getCityName } from './selectors';

describe('Town selectors', () => {
  it('should return city', () => {
    const state = {
      [NameSpace.Town]: {
        currentCity: CITIES[0],
      }
    };
    const expectedState = CITIES[0];

    const result = getCity(state);

    expect(result).toBe(expectedState);

  });

  it('should return city name', () => {
    const state = {
      [NameSpace.Town]: {
        currentCity: CITIES[0],
      }
    };
    const expectedState = CITIES[0].name;

    const result = getCityName(state);

    expect(result).toBe(expectedState);

  });
});
