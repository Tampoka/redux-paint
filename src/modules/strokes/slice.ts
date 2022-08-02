import {RootState, Stroke} from '../../utils/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {endStroke, resetAll} from '../sharedActions';

const initialStrokes: RootState["strokes"] = []

const slice = createSlice({
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

export const strokes=slice.reducer
export const {setStrokes} = slice.actions

