import {RootState, Stroke} from '../../utils/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {endStroke, resetAll} from '../sharedActions';

/*
const initialState: RootState["strokes"] = []

export const slice = createReducer(initialState, (builder) => {
    builder.addCase(endStroke, (state, action) => {
        const {historyIndex, stroke} = action.payload
        if (historyIndex === 0) {
            state.push(stroke)
        } else {
            state.splice(-historyIndex, historyIndex, stroke)
        }
    })
})*/

const initialStrokes: RootState["strokes"] = []

const strokes = createSlice({
    name: "strokes",
    initialState: initialStrokes,
    reducers: {
        setStrokes: (state, action: PayloadAction<Stroke[]>) => {
            return action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(endStroke, (state, action) => {
            const {historyIndex, stroke} = action.payload
            if (historyIndex === 0) {
                state.push(stroke)
            } else {
                state.splice(-historyIndex, historyIndex, stroke)
            }
        })
        builder.addCase(resetAll, (_) => {
            return []
        })
    }
})

export default strokes.reducer
export const {setStrokes} = strokes.actions

