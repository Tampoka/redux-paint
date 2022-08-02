import {
    Action,
    configureStore,
    getDefaultMiddleware,
    ThunkAction
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {currentStroke} from './modules/currentStroke/slice';
import {modalVisible} from './modules/modals/slice'
import {RootState} from './utils/types';
import {projectsList} from './modules/projectsList/slice';
import {historyIndex} from './modules/historyIndex/slice';
import {strokes} from './modules/strokes/slice';


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
