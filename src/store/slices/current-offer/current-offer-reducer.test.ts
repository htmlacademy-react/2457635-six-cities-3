import { describe, expect, it } from 'vitest';
import { NameSpace } from '../../../constants';
import { fakeCurrentOffer } from '../../../mock';
import { getCurrentOffer } from './current-offer-reducer';

describe('Current offer reducer', () => {
  it('should return current offer', () => {
    const state = {
      [NameSpace.CurrentOffer]: {
        currentOffer: fakeCurrentOffer,
        isCurrentOfferLoaded: false,
        hasCurrentOfferError: false,
      }
    };
    const expectedCurrentOffer = fakeCurrentOffer;

    const result = getCurrentOffer(state);

    expect(result).toBe(expectedCurrentOffer);
  });
});
