import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from "redux-logger";
import rootReducer from '../rootReducer';
import rootSaga from '../rootSaga';
import history from './history';

//createSagaMiddleware에서 넣어주는 context는 initialState 같은 개념으로 보면 된다
//context API 을 본따 만든 개념 같다고 하심 원하는 정보를 미리 저장해두고 GETcONTEXT("키이름")을 사용하여 꺼내쓸 수 있고
//해당 미들웨어에서 SETcONTEXT로 다시 내장할 수도 있다.
//SAGA에서 화면 전환을 위해 사용할 history를 넣고 그게 아니라면 생략해도 된다 (saga에서 history import 하여 사용 가능)
const sagaMiddleware = createSagaMiddleware({
    context: { history: history },
});

const initialState = {};

const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware, logger],
    devTools: true,
    preloadedState: initialState,
});

sagaMiddleware.run(rootSaga);

export default store;

