import { currentOfferSlice } from './current-offer-slice';
import { CurrentOffer } from '../../../types/models';
import { getDataCurrentOffer } from '../../api-actions';
import { fakeCurrentOffer } from '../../../test/mock';
import { setCurrentOfferFavorite } from './current-offer-action';

describe('Current offer reducer', () => {
  it('should return initial state with empty action', () => {
    const state = {
      currentOffer: {} as CurrentOffer,
      isCurrentOfferLoaded: false,
      hasCurrentOfferError: false,
    };
    const emptyAction = { type: '' };

    const result = currentOfferSlice.reducer(state, emptyAction);

    expect(result).toEqual(state);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const state = {
      currentOffer: {} as CurrentOffer,
      isCurrentOfferLoaded: false,
      hasCurrentOfferError: false,
    };

    const result = currentOfferSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(state);
  });

  it('should set "isCurrentOfferLoaded" to "true", "hasCurrentOfferError" to "false" with "getDataCurrentOffer.pending"', () => {
    const initialState = {
      currentOffer: {} as CurrentOffer,
      isCurrentOfferLoaded: false,
      hasCurrentOfferError: false,
    };
    const expectedState = {
      currentOffer: {} as CurrentOffer,
      isCurrentOfferLoaded: true,
      hasCurrentOfferError: false,
    };

    const result = currentOfferSlice.reducer(initialState, getDataCurrentOffer.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set currentOffer, "hasCurrentOfferError" to "false" with "getDataCurrentOffer.fullfilled"', () => {
    const initialState = {
      currentOffer: {} as CurrentOffer,
      isCurrentOfferLoaded: false,
      hasCurrentOfferError: false,
    };
    const expectedState = {
      currentOffer: fakeCurrentOffer,
      isCurrentOfferLoaded: false,
      hasCurrentOfferError: false,
    };

    const result = currentOfferSlice.reducer(initialState, getDataCurrentOffer.fulfilled(expectedState.currentOffer, expectedState.currentOffer.id, undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "isCurrentOfferLoaded" to "true", "hasCurrentOfferError" to "true" with "getDataCurrentOffer.rejected', () => {
    const initialState = {
      currentOffer: {} as CurrentOffer,
      isCurrentOfferLoaded: false,
      hasCurrentOfferError: false,
    };
    const expectedState = {
      currentOffer: {} as CurrentOffer,
      isCurrentOfferLoaded: false,
      hasCurrentOfferError: true,
    };

    const result = currentOfferSlice.reducer(initialState, getDataCurrentOffer.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set current offer isFavorite to "true"', () => {
    const initialState = {
      currentOffer: fakeCurrentOffer,
      isCurrentOfferLoaded: false,
      hasCurrentOfferError: false,
    };
    const expectedState = {
      currentOffer: {...fakeCurrentOffer, isFavorite: !fakeCurrentOffer.isFavorite},
      isCurrentOfferLoaded: false,
      hasCurrentOfferError: false,
    };

    const result = currentOfferSlice.reducer(initialState, setCurrentOfferFavorite(expectedState.currentOffer.isFavorite));

    expect(result).toEqual(expectedState);
  });

});
