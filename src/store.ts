import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {reducer as historyIndex} from './modules/historyIndex/reducer'
import {reducer as currentStroke} from './modules/currentStroke/reducer'
import {reducer as strokes} from './modules/strokes/reducer'

// const middlewareEnhancer = applyMiddleware(thunkMiddleware,logger)
// const composedEnhancers = composeWithDevTools(middlewareEnhancer)

const middleware = [...getDefaultMiddleware(), logger]
export const store = configureStore({
    reducer: combineReducers({
        historyIndex,
        currentStroke,
        strokes
    }), middleware
})

