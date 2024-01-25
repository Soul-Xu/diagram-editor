// src/redux/gridLayoutSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface gridLayoutState {
  gridLayout: boolean;
}

const initialState: gridLayoutState = {
  gridLayout: true, // Set default color
};

const gridLayoutSlice = createSlice({
  name: 'gridLayout',
  initialState,
  reducers: {
    setGridLayout: (state, action: PayloadAction<any>) => {
      console.log("state.gridLayout", action.payload)
      state.gridLayout = action.payload;
    },
  },
});

export const { setGridLayout } = gridLayoutSlice.actions;
export default gridLayoutSlice.reducer;
