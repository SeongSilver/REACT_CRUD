import { takeLatest } from 'redux-saga/effects'
import { articleActions } from '../slice/articleSlice'
import { registerArticleAsync } from './articeSaga'

const { registerArticle } = articleActions;

//rootSaga.js에서는 뷰에서 registerArticle 액션 생성 함수를 dispatch(일이 일어남 액션전달)하게 되면
//articleSaga의 registerArticleAsync함수를 호출하도록 하였다.
export default function* rootWatcher() {
    /*
    takeLatest() : 기존에 진행 중이던 작업이 있다면 취소 처리하고
    가장 마지막으로 실행된 작업만 수행하는 함수
    ex) takeLatest(DECREASE_ASYNC, decreaseSaga)
    -> DECREASE_ASYNC 액션에 대해서 기존에 진행 중이던 작업이 있다면
    취소 처리하고 가장 마지막으로 실행된 작업에 대해서만
    decreaseSaga 함수를 실행한다
    */

    yield takeLatest(registerArticle.type, registerArticleAsync);
}