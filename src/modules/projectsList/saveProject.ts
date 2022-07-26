import {AppThunk} from '../../store';
import {drawingsApi} from '../../api/drawings-api';
import {addProject} from './slice';

export const saveProject = (
    projectName: string,
    thumbnail: string
): AppThunk => async (dispatch, getState) => {
    try {
       const res= await drawingsApi.createDrawing(
            projectName,
            getState().strokes,
            thumbnail
        )
        await dispatch(addProject(res.data))
    } catch (err: any) {
        console.log(err.message)
    }
}
