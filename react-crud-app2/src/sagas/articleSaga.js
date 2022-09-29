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

//#5에서 추가 
function apiPutArticle(requestBody) {
    return axios.put(`article/${requestBody?.id}`, requestBody);
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

//#5에서 추가
function* asyncGetArticle(action) {
    try {
        const response = yield call(apiGetArticle, action.payload);
        if (response?.status === 200) {
            yield put(articleActions.getArticleListSuccess()); //조회 성공확인판단 하는 용도로 남김
            yield put(articleActions.updateArticleViews(response.data));//조회수 업데이트 액션 호출
        } else {
            yield put(articleActions.getArticleFail(response));
        }
    } catch (e) {
        console.error(e);
        yield put(articleActions.getArticleFail(e.response));
    }
}

//#5에서 추가
function* asyncUpdateArticleViews(action) {
    try {
        const response = yield call(apiPutArticle, {
            ...action.payload,
            views: parseInt(action.payload?.views ?? 0) + 1,
            updateDate: Date.now()
        });
        if (response?.status === 200) {
            yield put(articleActions.updateArticleViewsSuccess(response));
        } else {
            yield put(articleActions.updateArticleViewsFail(response));
        }
    } catch (e) {
        console.error(e);
        yield put(articleActions.updateArticleViewsFail(e?.response));
    }
}

//action 호출을 감시하는 watch 함수
function* watchGetArticleList() {
    while (true) {
        const action = yield take(articleActions.getArticleList);
        yield call(asyncGetAritcleList, action);
    }
}

function* watchGetArticle() {
    while (true) {
        const action = yield take(articleActions.getArticle);
        yield call(asyncGetArticle, action);
    }
}

function* watchUpdateArticleViews() {
    while (true) {
        const action = yield take(articleActions.updateArticleViews);
        yield call(asyncUpdateArticleViews, action);
    }
}


export default function* articleSaga() {
    yield all([
        fork(watchGetArticleList),
        fork(watchGetArticle),
        fork(watchUpdateArticleViews)
    ]);
}
