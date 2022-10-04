import { map } from 'ramda';
import { all, fork } from "redux-saga/effects";
import boardSaga from './sagas/boardSaga';
import articleSaga from './sagas/articleSaga';
import commentSaga from './sagas/commentSaga';
import codeSaga from './sagas/codeSga';

let combineSagas = {}
//boardSaga, articleSaga를 객체형태로 넣어주어야 한다
combineSagas = Object.assign(combineSagas, { boardSaga, codeSaga, articleSaga, commentSaga }); //수정부분

export default function* rootSaga() {
    yield all(map(fork, combineSagas));
}
