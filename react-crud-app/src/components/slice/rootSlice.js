import {combineReducers} from 'redux';
import { articleReducer } from './articleSlice';

const rootReducer = combineReducers({articleReducer});

export default rootReducer;