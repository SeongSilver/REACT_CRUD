import { combineReducers } from 'redux';
import { articleReducers } from './articleSlice';

const rootReducer = combineReducers({ articleReducers });

export default rootReducer;