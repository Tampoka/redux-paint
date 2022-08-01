import {Project} from '../../utils/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchProjectsList} from './fetchProjectsList';
import {removeProject} from './removeProject';
import {saveProject} from './saveProject';

export type ProjectsListState = {
    error: string | null
    pending: boolean
    projects: Project[]
}

const initialState: ProjectsListState = {
    error: null,
    pending: false,
    projects: []
}

const slice = createSlice({
    name: "projectsList",
    initialState,
    reducers: {
        setAppStatus: (
            state,
            action: PayloadAction<{ pending: boolean }>
        ) => {
            state.pending = action.payload.pending
        },
        /*    getProjectsListSuccess: (
                state,
                action: PayloadAction<Project[]>
            ) => {
                state.error = null
                state.pending = false
                state.projects = action.payload
            },*/
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProjectsList.fulfilled, (state, action) => {
            state.projects = action.payload.projects
        })
        builder.addCase(removeProject.fulfilled, (state, action) => {
            const index = state.projects.findIndex(d => d._id === action.payload.id)
            if (index > -1) {
                state.projects.splice(index, 1)
            }
        })
        builder.addCase(saveProject.fulfilled, (state, action) => {
            state.projects.unshift({...action.payload.newProject})
        })
    }
})

export const projectsList = slice.reducer
export const {
    setAppStatus,
    setAppError
} = slice.actions