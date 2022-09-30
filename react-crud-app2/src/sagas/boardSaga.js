import { all, call, fork, put, take } from 'redux-saga/effects';
import { boardActions } from '../slices/boardSlice';
import axios from '../utils/axios';

/**redus-saga/effect의 역할
take : 해당 액션이 dispatch되면 제너레이터를 next한다
put : 특정 action을 dispatch 시켜준다
takeEvery : 모든 해당 액션을 처리한다
takeLatest : 가장 마지막으로 dispatch된 액션을 처리한다
all : 여러 사가를 합쳐주는 역할을 한다. all은 파라미터로 배열을 받는데,
    배열 내에 있는 것을 모두 실행시킨다
call(동기) : 함수를 동기적으로 실행시켜준다. 첫번째 파라미터는 함수, 두번째 파라미터는 해당 함수에 넣을 인수다
fork(비동기) : call과 파라미터가 같고 마찬가지로 함수를 실행시키는 역할이다. 그러나 비동기이기 때문에 결과값을 기다려주지 않는다
*/

//api서버 연결 주소
function apiGetBoard(boardId) {
    return axios.get(`boards/${boardId}`);
}
function apiGetBoardList() {
    return axios.get(`boards`);
}

//api서버 연결 후 action 호출
function* asyncGetBoardList() {
    try {
        const response = yield call(apiGetBoardList);
        if (response?.status === 200) {
            yield put(boardActions.getBoardListSuccess(response));
        } else {
            yield put(boardActions.getBoardListFail(response));
        }
    } catch (e) {
        console.error(e);
        yield put(boardActions.getBoardListFail(e.response));
    }
}

//action 호출을 감시하는 watch 함수
function* watchGetBoardList() {
    while (true) {
        yield take(boardActions.getBoardList);
        yield call(asyncGetBoardList);
    }
}

export default function* boardSaga() {
    yield all([fork(watchGetBoardList)]);
}