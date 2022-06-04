import {Stroke} from '../../types';
import {createAction} from '@reduxjs/toolkit';

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

export const redo = createAction("REDO")

export const undo = createAction<number>("REDO")

export const endStroke = createAction<{
    stroke: Stroke
    historyIndex: number
}>("endStroke")