import { NameSpace } from '../../../constants';
import { fakeOffers } from '../../../test/mock';
import { favoriteOffers, getAllOffers, getCurrentLoadingStatus } from './offers-reducer';
import { Offers } from '../../../types/models';

describe('Offers reducer', () => {
  it ('should return all offers', () => {
    const state = {
      [NameSpace.Offers]: {
        offers: fakeOffers,
        isOffersLoaded: false,
      }
    };
    const expectedState = fakeOffers;

    const result = getAllOffers(state);

    expect(result).toEqual(expectedState);

  });

  it ('should return all offers as []', () => {
    const state = {
      [NameSpace.Offers]: {
        offers: [] as Offers,
        isOffersLoaded: false,
      }
    };
    const expectedState = [] as Offers;

    const result = getAllOffers(state);

    expect(result).toEqual(expectedState);

  });

  it ('should return favorite offers', () => {
    const state = {
      [NameSpace.Offers]: {
        offers: fakeOffers,
        isOffersLoaded: false,
      }
    };
    const expectedState = fakeOffers.filter((offer) => offer.isFavorite);

    const result = favoriteOffers(state);

    expect(result).toEqual(expectedState);

  });

  it ('should return favorite offers as []', () => {
    const state = {
      [NameSpace.Offers]: {
        offers: fakeOffers.filter((offer) => !offer.isFavorite),
        isOffersLoaded: false,
      }
    };
    const expectedState = [] as Offers;

    const result = favoriteOffers(state);

    expect(result).toEqual(expectedState);

  });

  it ('should return loading status', () => {
    const state = {
      [NameSpace.Offers]: {
        offers: fakeOffers,
        isOffersLoaded: false,
      }
    };
    const expectedState = false;

    const result = getCurrentLoadingStatus(state);

    expect(result).toBe(expectedState);
  });
});
