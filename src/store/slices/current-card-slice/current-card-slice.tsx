import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../constants';


export const currentCardSlice = createSlice({
  name: NameSpace.CurrentCard,
  initialState: {
    currentCard: '',
  },
  reducers: {
    setCurrentCardId: (state, action: PayloadAction<string>) => {
      state.currentCard = action.payload;
    },
  },
});

export const {setCurrentCardId} = currentCardSlice.actions;
