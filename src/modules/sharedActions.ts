import {Stroke} from '../utils/types';
import {createAction} from '@reduxjs/toolkit';

export const endStroke = createAction<{
    stroke: Stroke
    historyIndex: number
}>("endStroke")