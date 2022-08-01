import {setAppError, setAppStatus} from './slice';
import {drawingsApi} from '../../api/drawings-api';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchProjectsList = createAsyncThunk('projects/fetchProjects', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({pending: true}))
    try {
        const res = await drawingsApi.getDrawings()
        dispatch(setAppStatus({pending: false}))
        return {projects: res.data}
    } catch (err: any) {
        dispatch(setAppError(err.toString()))
        return rejectWithValue({})
    }
})