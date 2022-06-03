import {Action, BEGIN_STROKE, END_STROKE, SET_STROKE_COLOR, UPDATE_STROKE} from "./actions"
import {RootState} from "./types"

const initialState: RootState = {
    currentStroke: { points: [], color: "#000" },
    strokes: [],
    historyIndex: 0
}

export const rootReducer = (
    state: RootState = initialState,
    action: Action
) => {
    switch (action.type) {
        case BEGIN_STROKE: {
            return {
                ...state,
                currentStroke: { ...state.currentStroke, points: [action.payload] }
            }
        }
        case UPDATE_STROKE: {
            return {
                ...state,
                currentStroke: {
                    ...state.currentStroke,
                    points: [...state.currentStroke.points, action.payload]
                }
            }
        }
        case SET_STROKE_COLOR: {
            return {
                ...state,
                currentStroke: { ...state.currentStroke, ...{ color: action.payload } }
            }
        }
        case END_STROKE: {
            if (!state.currentStroke.points.length) {
                return state
            }
            const historyLimit = state.strokes.length - state.historyIndex
            const newState = {
                ...state,
                historyIndex: 0,
                currentStroke: { ...state.currentStroke, points: [] },
                strokes: [...state.strokes.slice(0, historyLimit), state.currentStroke]
            }
            return newState
        }

        default:
            return state
    }
}