import { createSlice } from '@reduxjs/toolkit';
import Trait from 'interfaces/Trait';

const traitSlice = createSlice({
  name: 'traits',
  initialState: [] as Trait[],
  reducers: {
    setTraits: (state, action) => {
      state = action.payload;
    },
    addTrait: (state, action) => {
      state.push(action.payload);
    },
    setTraitName: (state, action) => {
      const trait = state.find(t => t.id === action.payload.id);
      if (trait) trait.name = action.payload.name;
    },
    removeTrait: (state, action) => {
      return state.filter(trait => trait.id !== action.payload);
    },
    swapIndexes: (state, action) => {
      const { from, to } = action.payload;
      const tempFrom = state.find(t => t.id === from);
      const tempTo = state.find(t => t.id === to);
      if (tempFrom && tempTo) {
        const tempIndex = tempTo.index;
        tempTo.index = tempFrom.index;
        tempFrom.index = tempIndex;
      }
    },
  },
}); // end traitSlice
export const { setTraits, addTrait, removeTrait, setTraitName, swapIndexes } =
  traitSlice.actions;

export default traitSlice.reducer;
