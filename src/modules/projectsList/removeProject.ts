import {deleteProject, getProjectsListFailed} from './slice';
import {AppThunk} from '../../store';
import {drawingsApi} from '../../api/drawings-api';

export const removeProject = (id: string): AppThunk => async (dispatch) => {
    try {
        console.log(`id in removeProject: ${id}`)
        const res = await drawingsApi.deleteDrawing(id)
        dispatch(deleteProject(id))
        console.log(res.data)
    } catch (err: any) {
        dispatch(getProjectsListFailed(err.toString()))
    }
}