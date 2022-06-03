import {rootReducer} from './rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {applyMiddleware, createStore} from '@reduxjs/toolkit';
import thunkMiddleware from "redux-thunk"

const middlewareEnhancer = applyMiddleware(thunkMiddleware)
const composedEnhancers = composeWithDevTools(middlewareEnhancer)

let store = createStore(rootReducer, composedEnhancers)