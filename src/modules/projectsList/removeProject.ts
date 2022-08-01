import {setAppError, setAppStatus} from './slice';
import {drawingsApi} from '../../api/drawings-api';
import {createAsyncThunk} from '@reduxjs/toolkit';

// export const removeProject = (id: string): AppThunk => async (dispatch) => {
//     try {
//         console.log(`id in removeProject: ${id}`)
//         const res = await drawingsApi.deleteDrawing(id)
//         dispatch(deleteProject(id))
//         console.log(res.data)
//     } catch (err: any) {
//         dispatch(getProjectsListFailed(err.toString()))
//
//     }
// }

export const removeProject = createAsyncThunk('projects/removeProject', async (param:{id:string}, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({pending: true}))
    try {
         await drawingsApi.deleteDrawing(param.id)
        dispatch(setAppStatus({pending: false}))
        return {id:param.id}
    } catch (err: any) {
        dispatch(setAppError(err.toString()))
        return rejectWithValue({})
    }
})