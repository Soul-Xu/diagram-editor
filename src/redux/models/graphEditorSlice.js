// src/redux/graphEditorSlice.ts
import { createSlice } from '@reduxjs/toolkit';
var initialState = {
    linkColor: '#FF620C'
};
var graphEditorSlice = createSlice({
    name: 'graphEditor',
    initialState: initialState,
    reducers: {
        setLinkColor: function (state, action) {
            state.linkColor = action.payload;
        }
    }
});
export var setLinkColor = graphEditorSlice.actions.setLinkColor;
export default graphEditorSlice.reducer;
