import {getProjectsListFailed, getProjectsListSuccess} from './slice';
import {AppThunk} from '../../store';
import {drawingsApi} from '../../api/drawings-api';

export const fetchProjectsList = (): AppThunk => async (dispatch) => {
    try {
        const res = await drawingsApi.getDrawings()
        dispatch(getProjectsListSuccess(res.data))
    } catch (err: any) {
        dispatch(getProjectsListFailed(err.toString()))
    }
}