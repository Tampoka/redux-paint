import {Stroke} from '../../types';

export const END_STROKE = "END_STROKE"
export const UNDO = "UNDO"
export const REDO = "REDO"

export type HistoryIndexAction =
    | {
    type: typeof END_STROKE
    payload: { stroke: Stroke, historyLimit: number }
}
    | {
    type: typeof REDO
}
    | {
    type: typeof UNDO
    payload: number
}

export const redo = () => {
    return {type: REDO}
}

export const undo = (undoLimit: number) => {
    return {type: UNDO, payload: undoLimit}
}