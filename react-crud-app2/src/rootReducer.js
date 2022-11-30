import { combineReducers } from 'redux';
import { boardReducer } from './slices/boardSlice';
import { codeReducer } from './slices/codeSlice';
import { articleReducer } from './slices/articleSlice';
import { commentReducer } from './slices/commentSlice';

const rootReducer = combineReducers({
    boardReducer,
    codeReducer,
    articleReducer,
    commentReducer
});

export default rootReducer;