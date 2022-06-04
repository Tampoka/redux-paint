import {ModalState} from '../modules/modals/slice';

export type Point = {
    x: number
    y: number
}

export type Stroke = {
    points: Point[]
    color: string
}

export type Project = {
    image: string;
    name: string;
    id: string
}

export type RootState = {
    modalVisible: ModalState;
    currentStroke: Stroke
    strokes: Stroke[]
    historyIndex:number
}