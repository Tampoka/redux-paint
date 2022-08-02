import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {endStroke, resetAll} from '../sharedActions';

// const initialState: RootState["historyIndex"] = 0

 const slice = createSlice({
    name: "historyIndex",
    initialState: 0,
    reducers: {
        undo: (state, action: PayloadAction<number>) => {
            return Math.min(state + 1, action.payload)
        },
        redo: (state) => {
            return Math.max(state - 1, 0)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(endStroke, () => {
            return 0
        })
        builder.addCase(resetAll, () => {
            return 0
        })
    }
})

export const historyIndex=slice.reducer
export const {undo, redo} = slice.actions

