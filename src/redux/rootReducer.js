// src/redux/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import graphEditorSlice from './models/graphEditorSlice';
var rootReducer = combineReducers({
    graphEditor: graphEditorSlice
});
export default rootReducer;
