import {ModalState} from '../modules/modals/slice';
import {ProjectsListState} from '../modules/projectsList/slice';

export type Point = {
    x: number
    y: number
}

export type Stroke = {
    points: Point[]
    color: string
}

export type Project = {
    image: string
    name: string
    _id: string
    strokes: Stroke[]
}

export type RootState = {
    projectsList: ProjectsListState
    modalVisible: ModalState
    currentStroke: Stroke
    strokes: Stroke[]
    historyIndex: number
}