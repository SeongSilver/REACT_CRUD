import {configureStore} from '@reduxjs/toolkit';

import createSagaMiddleware from "redux-saga" 
import logger from "redux-logger";
import rootReducer from './components/slice/rootSlice';

const sagaMiddleware = createSagaMiddleware();
const initialState = {};

const store = configureStore({
    reducer : rootReducer,
    devTools:true,
    preloadedState:initialState,
});

export default store;