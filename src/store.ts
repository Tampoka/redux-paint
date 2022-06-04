import {Action, configureStore, getDefaultMiddleware, ThunkAction} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import historyIndex from './modules/historyIndex/slice';
import strokes from './modules/strokes/slice';
import {currentStroke} from './modules/currentStroke/slice';
import {modalVisible} from './modules/modals/slice'
import {RootState} from './utils/types';
import {projectsList} from './modules/projectsList/slice';


const middleware = [...getDefaultMiddleware(), logger]
export const store = configureStore({
    reducer: {
        historyIndex,
        currentStroke,
        strokes,
        modalVisible,
        projectsList
    },
    middleware

})

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
