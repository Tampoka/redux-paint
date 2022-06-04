import {Project} from '../../utils/types';
import {getProjectsListFailed, getProjectsListSuccess} from './slice';
import {AppThunk} from '../../store';
import {fetchProjectsList} from './api';

export const getProjectsList = (): AppThunk => async (dispatch) => {
    try {
        const projectsList: Project[] = await fetchProjectsList()
        dispatch(getProjectsListSuccess(projectsList))
    } catch (err: any) {
        dispatch(getProjectsListFailed(err.toString()))
    }
}