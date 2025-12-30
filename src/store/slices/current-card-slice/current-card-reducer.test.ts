import { NameSpace } from '../../../constants';
import { cardId } from '../../../test/mock';
import { getCurrentCardId } from './current-card-reducer';

describe('Current card reducer', () => {
  it('should return current card from state', () => {
    const state = {
      [NameSpace.CurrentCard]: {
        currentCard: cardId,
      }
    };
    const currentCard = cardId;

    const result = getCurrentCardId(state);

    expect(result).toBe(currentCard);
  });

});
