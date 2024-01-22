// src/redux/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import graphEditorSlice from './models/graphEditorSlice';

const rootReducer = combineReducers({
  graphEditor: graphEditorSlice,
});

export default rootReducer;
