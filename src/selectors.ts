import {RootState} from './types';

export const currentStrokeSelector=(state:RootState)=>state.currentStroke
export const isDrawingSelector = (state:RootState)=>!!state.currentStroke.points.length
export const strokesSelector =(state:RootState)=>state.strokes
