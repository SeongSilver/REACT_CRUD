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
//#10에서 추가
function apiPostBoard(requestBody) {
    return axios.post(`boards`, requestBody);
}
function apiPutBoard(requestBody) {
    return axios.put(`boards/${requestBody?.id}`, requestBody);
}
function apiDeleteBoard(boardId) {
    return axios.delete(`boards/${boardId}`);
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

//#10에서 추가
function* asyncGetBoard(action) {
    try {
        const response = yield call(apiGetBoard, action.payload);
        if (response?.status === 200) {
            yield put(boardActions.getBoardSuccess());
        } else {
            yield put(boardActions.getBoardFail(response));
        }
    } catch (e) {
        console.error(e);
        yield put(boardActions.getBoardFail(e.response));
    }
}

//#10에서 추가
function* asyncPostBoard(action) {
    try {
        const response = yield call(apiPostBoard, {
            ...action.payload.board,
            id: 0,
            insertDate: Date.now(),
            updateDate: Date.now()
        });
        if (response?.status === 201) {
            yield put(boardActions.postBoardSuccess());
            alert("등록되었습니다!");
            /**
             * 게시판 신규 등록의 경우 CreateBoard.js에서 setShowCreateBoard(컴폰넌트를 보여줄지 말지 결정하는 useState의 set메서드)를
             * action.payload로 넘겨준 것을 호출해서
             * 
             * post성공시 입력폼 접히는 효과가 난다.
             * put과 delete부분에는 안넣었다 그래서 저장이나 삭제가 완료되면 게시판 목록을
             * 다시 조회해줄 뿐 입력 폼은 그대로 펼쳐져 있다.
             * 
             * 게시판 수정 입력폼을 열어놓은 채로 게시글을 등록하면 새로운 입력폼이 밑에 생기는 것이보인다
             * UpdateBoardList 컴포넌트에서 boardList가 업로드 될 때마다 setUpdatedBoardList가 동작하므로
             * 컴포넌트도 바로 렌더링 된다
             */
            yield call(action.payload?.setShowCreateBoard, false);
            yield put(boardActions.getBoardList());
        } else {
            yield put(boardActions.postBoardFail(response));
        }
    } catch (e) {
        console.error(e);
        yield put(boardActions.postBoardFail(e.response));
        yield alert(`등록실패 Error : ${e?.response?.status}, ${e?.response?.statusText}`);
    }
}

//#10에서 추가
function* asyncPutBoard(action) {
    try {
        const response = yield call(apiPutBoard, { ...action.payload, updateDate: Date.now() });
        if (response?.status === 200) {
            yield put(boardActions.putBoardSuccess());
            alert("저장되었습니다");
            yield put(boardActions.getBoardList());
        } else {
            yield put(boardActions.putBoardFail(response));
        }
    } catch (e) {
        console.error(e);
        yield put(boardActions.putBoardFail(e.response));
        yield alert(`저장실패 Error : ${e?.response?.status}, ${e?.response?.statusText}`);
    }
}

//#10에서 ㅊ구ㅏ
function* asyncDeleteBoard(action) {
    try {
        const response = yield call(apiDeleteBoard, action.payload);
        if (response?.status === 200) {
            yield put(boardActions.deleteBoardSuccess());
            alert("삭제되었습니다!");
            yield put(boardActions.getBoardList());
        } else {
            yield put(boardActions.deleteBoardFail(response));
        }
    } catch (e) {
        console.error(e);
        yield put(boardActions.deleteBoardFail(e.response));
        yield alert(`삭제실패 Error : ${e?.response?.status}, ${e?.response?.statusText}`);
    }
}

//action 호출을 감시하는 watch 함수
function* watchGetBoardList() {
    while (true) {
        yield take(boardActions.getBoardList);
        yield call(asyncGetBoardList);
    }
}

//#10에서 아래 4개 비동기 제너레이터 함수 추가
function* watchGetBoard() {
    while (true) {
        const action = yield take(boardActions.getBoard);
        yield call(asyncGetBoard, action);
    }
}
function* watchPostBoard() {
    while (true) {
        const action = yield take(boardActions.postBoard);
        yield call(asyncPostBoard, action);
    }
}
function* watchPutBoard() {
    while (true) {
        const action = yield take(boardActions.putBoard);
        yield call(asyncPutBoard, action);
    }
}
function* watchDeleteBoard() {
    while (true) {
        const action = yield take(boardActions.deleteBoard);
        yield call(asyncDeleteBoard, action);
    }
}
export default function* boardSaga() {
    yield all([
        fork(watchGetBoardList),
        fork(watchGetBoard),
        fork(watchPostBoard),
        fork(watchPutBoard),
        fork(watchDeleteBoard),
    ]);
}