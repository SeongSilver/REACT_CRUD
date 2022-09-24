import { combineReducers } from '@reduxjs/toolkit';
import productReducer from 'reduxToolkit_practice.js';

export default combineReducers({
    product: productReducer,
});