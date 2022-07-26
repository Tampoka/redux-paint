import {instance} from './config';
import {AxiosResponse} from 'axios';
import {Project, Stroke} from '../utils/types';
import {Optional} from '../utils/sharedTypes';

export const drawingsApi = {
    getDrawings() {
        return instance.get<Project[]>('/projects')
    },
    getDrawing(id: string) {
        return instance.get<Project>(`/projects/${id}`)
    },
    createDrawing(name: string, strokes: Stroke[], image: string) {
        return instance.post<Project>
        ('/projects/new', {name, strokes, image})
    },
    deleteDrawing(id: string) {
        return instance.delete<CommonResponseType>(`/projects/${id}`)
    }
}

export type CommonResponseType<D = {}> = {
    success: boolean
    error: Optional<string>
    data: D
}