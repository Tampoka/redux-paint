import {Project} from '../../utils/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type ProjectsListState = {
    error: string | null
    pending: boolean
    projects: Project[]
}

const initialState: ProjectsListState = {
    error: null,
    pending: true,
    projects: []
}

const slice = createSlice({
    name: "projectsList",
    initialState,
    reducers: {
        getProjectsListSuccess: (
            state,
            action: PayloadAction<Project[]>
        ) => {
            state.error = null
            state.pending = false
            state.projects = action.payload
        },
        getProjectsListFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.pending = false
            state.projects = []
        },
        getProjectsList: (
            state,
            action: PayloadAction<Project[]>
        ) => {
            state.projects = action.payload
        },
        addProject: (
            state,
            action: PayloadAction<Project>
        ) => {
            state.projects.push(action.payload)
        },
        deleteProject: (
            state,
            action: PayloadAction<string>
        ) => {
            const projectToRemove = state.projects.find(project => project.id !== action.payload)
            if (projectToRemove) {
                const indexToRemove = state.projects.indexOf(projectToRemove)
                state.projects.splice(indexToRemove, 1)
            }

        }
    }
})

export const projectsList = slice.reducer
export const {
    getProjectsListFailed,
    getProjectsListSuccess,
    getProjectsList,
    addProject,
    deleteProject
} = slice.actions