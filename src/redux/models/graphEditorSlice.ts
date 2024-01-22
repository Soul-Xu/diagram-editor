// src/redux/graphEditorSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GraphEditorState {
  linkColor: string;
}

const initialState: GraphEditorState = {
  linkColor: '#FF620C', // Set default color
};

const graphEditorSlice = createSlice({
  name: 'graphEditor',
  initialState,
  reducers: {
    setLinkColor: (state, action: PayloadAction<string>) => {
      state.linkColor = action.payload;
    },
  },
});

export const { setLinkColor } = graphEditorSlice.actions;
export default graphEditorSlice.reducer;
