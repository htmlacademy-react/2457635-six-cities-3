import { NameSpace } from '../../../constants';
import { fakeCurrentOffer } from '../../../test/mock';
import { getCurrentOffer } from './selectors';

describe('Current offer selectors', () => {
  it('should return current offer', () => {
    const state = {
      [NameSpace.CurrentOffer]: {
        currentOffer: fakeCurrentOffer,
        isCurrentOfferLoaded: false,
        hasCurrentOfferError: false,
        nearOffers: [],
        isNearOffersLoading: false,
        hasNearOffersError: false,
      }
    };
    const expectedCurrentOffer = fakeCurrentOffer;

    const result = getCurrentOffer(state);

    expect(result).toBe(expectedCurrentOffer);
  });
});
