import { createSlice } from '@reduxjs/toolkit';
import Asset from 'interfaces/Asset';

const assetSlice = createSlice({
  name: 'assets',
  initialState: [] as Asset[],
  reducers: {
    setAssets: (state, action) => {
      state = action.payload;
    },
    addAsset: (state, action) => {
      if (action.payload.traitId === undefined)
        throw new Error('addAsset: traitId is required');
      if (action.payload.id === undefined)
        action.payload.id = `${action.payload.traitId}-${state.length}`;
      state.push(action.payload);
      const fromTrait = state.filter(
        asset => asset.traitId === action.payload.traitId,
      );

      fromTrait.forEach(a => (a.percentage = 100 / fromTrait.length));
    },
    toggleLocked: (state, action) => {
      const asset = state.find(asset => asset.id === action.payload.id);

      if (asset) asset.locked = !asset.locked;
    },
    removeAsset: (state, action) => {
      state = state.filter(slider => slider.id !== action.payload);
    },
    updateAssetPercentage: (state, action) => {
      const asset = state.find(asset => asset.id === action.payload.id);
      if (asset) {
        if (asset.locked) return;
        const allFromTrait = state.filter(
          a => a.traitId === action.payload.traitId,
        );
        const assets = allFromTrait.filter(
          asset => asset.id !== action.payload.id && !asset.locked,
        );

        if (assets.length === 0) {
          asset.percentage = action.payload.percentage;
          return;
        }
        const leftToShare =
          100 -
          assets.reduce((acc, asset) => {
            return acc + asset.percentage;
          }, 0);
        if (leftToShare >= 100) return;
        asset.percentage = action.payload.percentage;
        const check = allFromTrait.reduce(
          (acc, asset) => (acc += asset.percentage),
          0,
        );
        if (check > 100) {
          const toRemove = Math.round((check - 100) * 10) / 10;
          assets
            .filter(a => a.percentage > 0)
            .forEach(
              asset =>
                (asset.percentage -=
                  toRemove / assets.filter(s => s.percentage > 0).length),
            );
        } else if (check < 100) {
          const toAdd = Math.round((100 - check) * 10) / 10;
          assets
            .filter(s => s.percentage < 100)
            .forEach(
              asset =>
                (asset.percentage +=
                  toAdd / assets.filter(s => s.percentage < 100).length),
            );
        }

        allFromTrait.forEach(
          slider =>
            (slider.percentage = Math.round(slider.percentage * 10) / 10),
        );
      }
    },
    clear: (state, action) => {
      state = [];
    },
  },
});

export const {
  setAssets,
  addAsset,
  removeAsset,
  updateAssetPercentage,
  toggleLocked,
  clear,
} = assetSlice.actions;

export default assetSlice.reducer;