import { all, call, retry, fork, put, take, select } from 'redux-saga/effects';
import { articleActions } from '../slices/articleSlice';
import history from '../utils/history';
import axios from '../utils/axios';
import qs from "query-string";

const SECOND = 1000;

//api 서버 연결 주소
function apiGetArticle(articleId) {
    return axios.get(`articles/${articleId}`);
}

function apiGetArticleList(requestParams) {
    //requestParams는 {boardId:숫자}이고 
    //query-string은 이걸 url의 query-string으로 바꿔준다
    //호출되는 url은 article?boardId=숫자가 된다
    return axios.get(`articles?${qs.stringify(requestParams)}`);
}

//#5에서 추가 게시글 수정시에도 재 활용될 것
function apiPutArticle(requestBody) {
    return axios.put(`articles/${requestBody?.id}`, requestBody);
}

//#7에서 추가 post기능
function apiPostArticle(requestBody) {
    return axios.post(`articles/`, requestBody);
}

//#9 글 삭제 기능에서 추가
function apiDeleteArticle(articleId) {
    return axios.delete(`articles/${articleId}`);
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
            yield put(articleActions.getArticleSuccess()); //조회 성공확인판단 하는 용도로 남김
            //이 방법의 단점은 getArticle 액션을 dispatch 할 때마다 조회수가 update가 되므로 다른 때에 재활용을 못한다는 것이다
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
            //조회수의 경우 다른 정보는 모두 같고 조회수만 +1이므로 
            //{...action,payload(게시글정보)} spread 배열을 이용하여 views와 updateDate만 덮어씌워준다
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

//#7에서 추가 게시판에 새 글 POST하기 (Post.js)
function* asyncPostArticle(action) {
    try {
        const response = yield call(apiPostArticle, {
            ...action.payload,
            id: 0,
            views: 0,
            insertDate: Date.now(),
            updateDate: Date.now()
        });
        if (response?.status === 201) {
            yield put(articleActions.postArticleSuccess());
            history.push(`/article/${response?.data?.id ?? 0}`);
        } else {
            yield put(articleActions.postArticleFail(response));
            yield alert(`등록실패 \n Error: ${response.status}, ${response.statusText}`);
        }
    } catch (e) {
        console.error(e);
        yield put(articleActions.postArticleFail(e?.response));
        yield alert(`등록실패 \n Error: ${e?.response?.status}, ${e?.response?.statusText}`);
    }
}

//#8 게시글 수정에서 추가
function* asyncSetArticle(action) {
    try {
        const response = yield call(apiGetArticle, action.payload?.articleId);
        if (response?.status === 200) {
            //action.payload?.setArticle은 액션을 통해 넘겨준 함수를 꺼내는 부분인데 call을 이용해 호출한다
            yield call(action.payload?.setArticle, response?.data ?? {});
        } else {
            yield alert(`불러오기 실패 Error : ${response.sattus}, ${response.statusText}`);
            history.go(-1);
        }
    } catch (e) {
        console.error(e);
        yield alert(`불러오기 실패 Error : ${e?.response?.status}, ${e?.response?.statusText}`)
        history.go(-1);
    }
}

//#8 게시글 수정에서 추가
function* asyncPutArticle(action) {
    try {
        const response = yield call(apiPutArticle, {
            ...action.payload,
            updateDate: Date.now()
        });
        if (response?.status === 200) {
            yield put(articleActions.putArticleSuccess());
            // history.push(`/article/${response?.data?.id ?? 0}`);
            history.go(-1);
        } else {
            yield put(articleActions.putArticleFail(response));
            yield alert(`수정실패 \n Error : ${response?.status}, ${response?.statusText}`);
        }
    } catch (e) {
        console.error(e);
        yield put(articleActions.putArticleFail(e?.response));
        yield alert(`수정실패 \n Error : ${e?.response?.status}, ${e?.response?.statusText}`);
    }
}

//#9 글 삭제에서 추가
function* asyncDeleteArticle() {
    try {
        const article = yield select((state) => state.articleReducer.article);
        const response = yield call(apiDeleteArticle, article?.id ?? 0);

        if (response?.status === 200) {
            yield put(articleActions.deleteArticleSuccess());
            alert('삭제되었습니다!');
            history.push(`/board/${article?.boardId ?? 0}`);
        } else {
            yield put(articleActions.deleteArticleFail(response));
        }
    } catch (e) {
        console.error(e);
        yield put(articleActions.deleteArticleFail(e.response));
        yield alert(`삭제실패 \n Error : ${e?.response?.status}, ${e?.response?.statusText}`);
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

//#7 post기능에서 추가
function* watchPostArticle() {
    while (true) {
        const action = yield take(articleActions.postArticle);
        yield call(asyncPostArticle, action);
    }
}

//#8 게시글 수정에서 추가
function* watchSetArticle() {
    while (true) {
        const action = yield take(articleActions.setArticle);
        yield call(asyncSetArticle, action);
    }
}
//#8 게시글 수정에서 추가
function* watchPutArticle() {
    while (true) {
        const action = yield take(articleActions.putArticle);
        yield call(asyncPutArticle, action);
    }
}

//#9 게시글 삭제에서 추가
function* watchDeleteArticle() {
    while (true) {
        yield take(articleActions.deleteArticle);
        yield call(asyncDeleteArticle);
    }
}

export default function* articleSaga() {
    yield all([
        fork(watchGetArticleList),
        fork(watchGetArticle),
        fork(watchUpdateArticleViews),
        fork(watchPostArticle),
        fork(watchSetArticle),
        fork(watchPutArticle),
        fork(watchDeleteArticle),
    ]);
}
