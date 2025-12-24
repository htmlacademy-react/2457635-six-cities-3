import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../../constants';
import { State } from '../../../types/state';

const currentCard = (state: State) => state[NameSpace.CurrentCard].currentCard;

export const getCurrentCardId = createSelector([currentCard], (card: string) => card);
