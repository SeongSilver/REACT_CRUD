import {takeLatest} from 'redux-saga/effects'
import {articleActions} from '../slice/articleSlice'
import { registerArticleAsync } from './articeSaga'

const { registerArticle } = articleActions;

export default funtion* rootWatcher(){
    yield takeLastest(registerArticle.tyle, registerArticleAsync);
}