import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../../constants';
import { State } from '../../../types/state';

type CurrentCardState = {
  currentCard: string;
};

const initialState: CurrentCardState = {
  currentCard: '',
};

export const currentCardSlice = createSlice({
  name: NameSpace.CurrentCard,
  initialState,
  reducers: {
    setCurrentCardId: (state, action: PayloadAction<string>) => {
      state.currentCard = action.payload;
    },
  },
});

export const { setCurrentCardId } = currentCardSlice.actions;

export default currentCardSlice.reducer;

const currentCard = (
  state: Pick<State, NameSpace.CurrentCard>
) => state[NameSpace.CurrentCard].currentCard;

export const getCurrentCardId = createSelector(
  [currentCard],
  (card) => card
);

