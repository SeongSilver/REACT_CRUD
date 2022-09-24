import { takeLatest } from 'redux-saga/effects'
import { articleActions } from '../slice/articleSlice'
import { registerArticleAsync } from './articeSaga'

const { registerArticle } = articleActions;

//rootSaga.js에서는 뷰에서 registerArticle 액션 생성 함수를 dispatch(일이 일어남 액션전달)하게 되면
//articleSaga의 registerArticleAsync함수를 호출하도록 하였다.
export default function* rootWatcher() {
    yield takeLatest(registerArticle.type, registerArticleAsync);
}