import {RootState} from '../../types';
import {endStroke} from './actions';
import {createReducer} from '@reduxjs/toolkit';

const initialState: RootState["strokes"] = []

export const reducer = createReducer(initialState, (builder) => {
    builder.addCase(endStroke, (state, action) => {
        const {historyIndex, stroke} = action.payload
        if (historyIndex === 0) {
            state.push(stroke)
        } else {
            state.splice(-historyIndex, historyIndex, stroke)
        }
    })
})