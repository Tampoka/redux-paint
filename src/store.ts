import {rootReducer} from './rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {applyMiddleware, createStore} from '@reduxjs/toolkit';
import thunkMiddleware from "redux-thunk"
import logger from 'redux-logger';

const middlewareEnhancer = applyMiddleware(thunkMiddleware,logger)
const composedEnhancers = composeWithDevTools(middlewareEnhancer)

export const store = createStore(rootReducer, composedEnhancers)