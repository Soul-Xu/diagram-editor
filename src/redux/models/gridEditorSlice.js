// src/redux/gridLayoutSlice.ts
import { createSlice } from '@reduxjs/toolkit';
var initialState = {
    gridLayout: true
};
var gridLayoutSlice = createSlice({
    name: 'gridLayout',
    initialState: initialState,
    reducers: {
        setGridLayout: function (state, action) {
            state.gridLayout = action.payload;
        }
    }
});
export var setGridLayout = gridLayoutSlice.actions.setGridLayout;
export default gridLayoutSlice.reducer;
