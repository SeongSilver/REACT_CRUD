import { all, call, retry, fork, put, take, select } from 'redux-saga/effects';
import { articleActions } from '../slices/articleSlice';
import axios from '../utils/axios';
import qs from "query-string";

const SECOND = 1000;

//api 서버 연결 주소
function apiGetArticle(articleId) {
    return axios.get(`article/${articleId}`);
}

function apiGetArticleList(requestParams) {
    //requestParams는 {boardId:숫자}이고 
    //query-string은 이걸 url의 query-string으로 바꿔준다
    //호출되는 url은 article?boardId=숫자가 된다
    return axios.get(`article?${qs.stringify(requestParams)}`);
}

//api서버 연결 후 action 호출
function* asyncGetAritcleList(action) {
    try {
        //const response = yield call(apiGetArticleList, {boardId:action.payload});
        //retry메서드는 call메서드(동기 실행)를 가지고 있다. 다만 주어진 조건에 따라 call을 시도하는 것
        //yield retry(횟수, 시간(mills), 호출함수, 호출함수 input)
        //첫번째 call이 실패했을 때 정해진 시간 간격마다 정해진 횟수 안에 연결이 성공할 때까지 call을 시도한다
        const response = yield retry(3, 10 * SECOND, apiGetArticleList, { boardId: action.payload });
        if (response?.status === 200) {
            yield put(articleActions.getArticleListSuccess(response));
        } else {
            yield put(articleActions.getArticleListFail(response));
        }
    } catch (e) {
        yield put(articleActions.getArticleListFail(e.response));
    }
}

//action 호출을 감시하는 watch 함수
function* watchGetArticleList() {
    while (true) {
        const action = yield take(articleActions.getArticleList);
        yield call(asyncGetAritcleList, action);
    }
}

export default function* articleSaga() {
    yield all([fork(watchGetArticleList)]);
}
