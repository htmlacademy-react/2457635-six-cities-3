import { Offer, Offers } from '../../../types/models';
import { favoriteOffersSlice } from './favorite-offers-slice';
import { fakeOffer, fakeOffers } from '../../../test/mock';
import { setFavoriteOffer, setFavoriteOffers } from './favorites-offers-action';

describe('Favorite offers slice', () => {
  const state = {
    favoriteOffers: [] as Offers,
  };

  it ('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = favoriteOffersSlice.reducer(state, emptyAction);

    expect(result).toEqual(state);
  });

  it ('should return initial state with undefined action', () => {
    const emptyAction = { type: '' };

    const result = favoriteOffersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(state);
  });

  it('should set favorite offers', () => {
    const initialState = {favoriteOffers: [] as Offers};
    const expectedFavoriteOffers = fakeOffers;

    const result = favoriteOffersSlice.reducer(initialState, setFavoriteOffers(expectedFavoriteOffers));

    expect(result.favoriteOffers).toEqual(expectedFavoriteOffers);
  });

  it('should set favorite offer', () => {
    const initialState = {favoriteOffers: [] as Offers};
    const expectedFavoriteOffers = fakeOffer() as unknown as Offers;

    const result = favoriteOffersSlice.reducer(initialState, setFavoriteOffers(expectedFavoriteOffers));

    expect(result.favoriteOffers).toEqual(expectedFavoriteOffers);
  });

  it('should set favorite offer as []', () => {
    const initialState = {favoriteOffers: [] as Offers};
    const expectedFavoriteOffers = [] as unknown as Offers;

    const result = favoriteOffersSlice.reducer(initialState, setFavoriteOffers(expectedFavoriteOffers));

    expect(result.favoriteOffers).toEqual(expectedFavoriteOffers);
  });

  it('should remove current favorite offers', () => {
    const initialState = {favoriteOffers: fakeOffers};
    const removedFavoriteOffer = fakeOffers[0];
    const expectedFavoriteOffers = fakeOffers.slice(1);

    const result = favoriteOffersSlice.reducer(initialState, setFavoriteOffer(removedFavoriteOffer));

    expect(result.favoriteOffers).toEqual(expectedFavoriteOffers);
  });

  it('should remove non-existent favorite offers', () => {
    const initialState = {favoriteOffers: fakeOffers};
    const removedFavoriteOffer = fakeOffer() as unknown as Offer;
    const expectedFavoriteOffers = fakeOffers;

    const result = favoriteOffersSlice.reducer(initialState, setFavoriteOffer(removedFavoriteOffer));

    expect(result.favoriteOffers).toEqual(expectedFavoriteOffers);
  });
});
