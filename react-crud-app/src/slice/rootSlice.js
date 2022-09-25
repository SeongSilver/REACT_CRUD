import { combineReducers } from 'redux';
import { articleReducers } from './articleSlice';

//rootSlice는 rootReducer의 개념이지만 slice 폴더에 있기에 rootSlice라고 명명한 것

//rootReducer라는 변수를 만들어 리듀서드을 묶어준다
const rootReducer = combineReducers({ articleReducers });

export default rootReducer;