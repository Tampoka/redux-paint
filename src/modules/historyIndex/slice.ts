import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {endStroke} from '../sharedActions';

/*const initialState: RootState["historyIndex"] = 0

export const slice = createReducer(initialState, (builder) => {
    builder.addCase(undo, (state, action) => {
        return Math.min(state + 1, action.payload)
    })
    builder.addCase(redo, (state, action) => {
        return Math.max(state - 1, 0)
    })
    builder.addCase(endStroke, (state, action) => {
        return 0
    })
})*/

const historyIndex = createSlice({
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
    }
})

export default historyIndex.reducer
export const {undo, redo} = historyIndex.actions