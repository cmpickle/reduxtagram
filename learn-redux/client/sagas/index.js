// import * as actions from './actions';
import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

export function* watcherSaga() {
    console.log("watcherSaga: start");

    // yield takeLatest(actions.ACTION, workerSaga);

    console.log("watcherSaga: stop");
};