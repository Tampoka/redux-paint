import {endStroke, redo, undo} from './actions';
import {RootState} from '../../types';
import {createReducer} from '@reduxjs/toolkit';

const initialState: RootState["historyIndex"] = 0

export const reducer = createReducer(initialState, (builder) => {
    builder.addCase(endStroke, (state, action) => {
        return 0
    })
    builder.addCase(undo, (state, action) => {
        return Math.min(state + 1, action.payload)
    })
    builder.addCase(redo, (state, action) => {
        return Math.max(state - 1, 0)
    })
})