import { describe, it, expect } from 'vitest';
import { Offers } from '../../../types/models';
import { offersSlice } from './offers-slice';
import { fetchOfferAction } from '../../api-actions';
import { fakeOffers } from '../../../mock';
import { replaceOffer } from './offers-action';

describe('Offers slice', () => {
  const state = {
    offers: [] as Offers,
    isOffersLoaded: false,
  };

  it ('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = offersSlice.reducer(state, emptyAction);

    expect(result).toEqual(state);
  });

  it ('should return initial state with undefined action', () => {
    const emptyAction = { type: '' };

    const result = offersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(state);
  });

  it ('should set key isOffersLoaded is true', () => {
    const expectedState = true;

    const result = offersSlice.reducer(state, fetchOfferAction.pending);

    expect(result.isOffersLoaded).toBe(expectedState);
  });

  it ('should set key isOffersLoaded is true and set key offers is Offers[]', () => {
    const initialState = {
      offers: [] as Offers,
      isOffersLoaded: true,
    };
    const expectedState = {
      offers: fakeOffers,
      isOffersLoaded: false,
    };

    const result = offersSlice.reducer(initialState, fetchOfferAction.fulfilled(fakeOffers,'', undefined));

    expect(result).toEqual(expectedState);
  });

  it ('should set key isOffersLoaded is false', () => {
    const initialState = {
      offers: [] as Offers,
      isOffersLoaded: true,
    };
    const expectedState = {
      offers: [] as Offers,
      isOffersLoaded: false,
    };

    const result = offersSlice.reducer(initialState, fetchOfferAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it ('should replace offer key isFavorite', () => {
    const initialState = {
      offers: fakeOffers,
      isOffersLoaded: false,
    };
    const expectedOffers = [{...fakeOffers[0], isFavorite: !fakeOffers[0].isFavorite}, ...fakeOffers.slice(1)];
    const expectedState = {
      offers: expectedOffers,
      isOffersLoaded: false,
    };

    const result = offersSlice.reducer(initialState, replaceOffer(fakeOffers[0].id));

    expect(result.offers).toEqual(expectedState.offers);
  });
});
