import { map } from 'ramda';
import { all, fork } from "redux-saga/effects";
import boardSaga from './sagas/boardSaga';

let combineSagas = {}
combineSagas = Object.assign(combineSagas, { boardSaga }); //수정부분

export default function* rootSaga() {
    yield all(map(fork, combineSagas));
}
