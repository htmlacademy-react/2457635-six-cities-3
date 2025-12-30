import { currentCardSlice, setCurrentCardId } from './current-card-slice';
import { cardId } from '../../../test/mock';

describe('Current card slice', () => {
  const state = {
    currentCard: '',
  };

  it ('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = currentCardSlice.reducer(state, emptyAction);

    expect(result).toEqual(state);
  });

  it ('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = currentCardSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(state);
  });

  it ('should replace currentCard value on current', () => {
    const initialState = {currentCard: ''};
    const expectedCardId = cardId;

    const result = currentCardSlice.reducer(initialState, setCurrentCardId(expectedCardId));

    expect(result.currentCard).toBe(expectedCardId);

  });

  it ('should return default value', () => {
    const initialState = {currentCard: ''};
    const expectedCardId = '';

    const result = currentCardSlice.reducer(initialState, setCurrentCardId(expectedCardId));

    expect(result.currentCard).toBe(expectedCardId);
  });


});
