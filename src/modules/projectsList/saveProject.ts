import {drawingsApi} from '../../api/drawings-api';
import {setAppError, setAppStatus} from './slice';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {Stroke} from '../../utils/types';

export const saveProject = createAsyncThunk('projects/saveProject', async (param: { projectName: string, thumbnail: string }, {
    dispatch,
    getState,
    rejectWithValue
}) => {
    dispatch(setAppStatus({pending: true}))
    try {
        // const {strokes} = getState() as { strokes: RootState["strokes"] };
        const {strokes} = getState() as { strokes: Stroke[] };
        const res = await drawingsApi.createDrawing(param.projectName, strokes, param.thumbnail)
        dispatch(setAppStatus({pending: false}))
        return {newProject: res.data.project}
    } catch (err: any) {
        dispatch(setAppError(err.toString()))
        return rejectWithValue({})
    }
})