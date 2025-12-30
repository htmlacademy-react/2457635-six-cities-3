import { describe, expect, it } from 'vitest';
import { NameSpace } from '../../../constants';
import { Offers } from '../../../types/models';
import { getAllFavoriteOffers } from './favorite-offers-reducer';
import { fakeOffers } from '../../../mock';

describe('Favorite offers reducer', () => {
  it('should return emty favorite offers', () => {
    const state = {
      [NameSpace.FavoriteOffers]: {
        favoriteOffers: [] as Offers,
      }
    };
    const expectedFavoriteOffers = [] as Offers;

    const result = getAllFavoriteOffers(state);

    expect(result).toEqual(expectedFavoriteOffers);

  });

  it('should return array favorite offers', () => {
    const state = {
      [NameSpace.FavoriteOffers]: {
        favoriteOffers: fakeOffers,
      }
    };
    const expectedFavoriteOffers = fakeOffers;

    const result = getAllFavoriteOffers(state);

    expect(result).toEqual(expectedFavoriteOffers);

  });
});
