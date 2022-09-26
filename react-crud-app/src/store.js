import { configureStore } from '@reduxjs/toolkit'

//사용할 미들웨어 import
import createSagaMiddleware from 'redux-saga'
//logger도 미들웨어의 한 종류인데 prevState( previous state), action, next State를 console창에 보여주는 기능을 한다
import logger from 'redux-logger'
import rootReducer from './slice/rootSlice';
import rootSaga from './sagas/rootSaga'
import history from './utils/history';

//saga를 실행시켜줄 creatSagaMiddleware을 sagaMiddleware라는 변수를 만들어 받아놓고 initialState도 세팅해준다
const sagaMiddleware = createSagaMiddleware({
    context: { history: history },
});
const initialState = {};

//configureStore 함수 내 필요한 데이터를 집어놓고 store라는 변수로 받아둔다
//redux-saga를 미들웨어로 쓸 것이기 때문에 createStore가 아닌 
//redux-toolkit의 configureStore를 사용한다
const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware, logger],
    //devTool이란 스프링부트에서 제공하는 개발 편의 모듈인데 여기서는 아닌듯..
    /* devTools란 ? 
    Google Chrome에 내장되어 있는 웹 저작 및 디버깅 도구이다. 크롬 개발자도구를
    이용하여 사이트를 반복하고, 디버깅하고, profiling할 수 있다. 개발자 도구는 Chrome
    뿐만 아니라 Internet Explorer, Firefox 등 대부분의 웹 브라우저에서 지원하고 있는 기능이다. 
    요즘은 많은 웹 개발자가 웹 브라우저에서 실시간으로 웹 사이트를 분석해야 하는 
    필요가 있는 경우에는 주로 크롬 개발자도구를 사용한다 */

    //devTools는 웹의 devTool 과 연결할 것인지 여부를 적는것이다
    devTools: true,

    //preloadState는 reducer에서 정해둔 initialState보다 더 앞서 prefix(접두사 먼저오는 그런거)될 state다
    preloadedState: initialState,
});

sagaMiddleware.run(rootSaga);

export default store;
