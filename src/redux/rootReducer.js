// src/redux/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import graphEditorSlice from './models/graphEditorSlice';
import gridLayoutSlice from './models/gridLayoutSlice';
var rootReducer = combineReducers({
    graphEditor: graphEditorSlice,
    gridLayout: gridLayoutSlice
});
export default rootReducer;
