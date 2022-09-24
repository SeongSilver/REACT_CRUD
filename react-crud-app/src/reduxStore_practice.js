import { createStore, applyMiddleware } from 'redux';
import { composeWidthDevTools } from 'redux-devtools-extention';
import thunk from "redux-thunk";
import rootReducer from "./reducers"

import { configureStore } from '@reduxjs/toolkit'

// let store = createStore(
//     rootReducer,
//     composeWidthDevTools(applyMiddleware(thunk))
// )

const store = configureStore({
    reducer: {
        product: rootReducer,
    }
})

export default store;
