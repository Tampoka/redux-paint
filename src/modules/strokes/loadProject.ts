import {AppThunk} from '../../store';
import {setStrokes} from './slice';
import {drawingsApi} from '../../api/drawings-api';

export const loadProject = (projectId: string): AppThunk => async (dispatch) => {
    try {
        const res = await drawingsApi.getDrawing(projectId)
        dispatch(setStrokes(res.data.strokes))
    } catch (err: any) {
        console.log(err.message)
    }
}