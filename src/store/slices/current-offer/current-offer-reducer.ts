import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../../constants';
import { CurrentOffer } from '../../../types/models';
import { State } from '../../../types/state';

const currentOffer = (state: State) => state[NameSpace.CurrentOffer].currentOffer;
export const getCurrentOffer = createSelector([currentOffer], (offer: CurrentOffer) => offer);
