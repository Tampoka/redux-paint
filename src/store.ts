import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import historyIndex from './modules/historyIndex/slice';
import strokes from './modules/strokes/slice';
import {currentStroke} from './modules/currentStroke/slice';
import {modalVisible} from './modules/modals/slice'


const middleware = [...getDefaultMiddleware(), logger]
export const store = configureStore({
    reducer: {
        historyIndex,
        currentStroke,
        strokes,
        modalVisible
    },
    middleware

})
