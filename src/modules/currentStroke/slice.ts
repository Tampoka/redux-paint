/*
const initialState: RootState["currentStroke"] = {
    points: [],
    color: "#000"
}

export const slice = createReducer(initialState, (builder) => {
    builder.addCase(beginStroke, (state, action) => {
        state.points = [action.payload]
    })
    builder.addCase(updateStroke, (state, action) => {
        state.points.push(action.payload)
    })
    builder.addCase(setStrokeColor, (state, action) => {
        state.color = action.payload
    })
    builder.addCase(endStroke, (state, action) => {
        state.points = []
    })
})
*/

import {Point, RootState} from '../../utils/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {endStroke} from '../sharedActions';

const initialState:RootState["currentStroke"] = {color: "#000", points: []}

const slice = createSlice({
    name: "currentStroke",
    initialState,
    reducers: {
        beginStroke: (state, action: PayloadAction<Point>) => {
            state.points = [action.payload]
        },
        updateStroke: (state, action: PayloadAction<Point>) => {
            state.points.push(action.payload)
        },
        setStrokeColor: (state, action: PayloadAction<string>) => {
            state.color = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(endStroke, (state) => {
            state.points = []
        })
    }
})

export const currentStroke = slice.reducer;
export const { beginStroke, updateStroke, setStrokeColor } = slice.actions;