import _ from 'lodash';
import {all, fork} from 'redux-saga/effects';
import appSaga from "saga/appSaga";
import accountSaga from 'saga/accountSaga';
import authSaga from 'saga/authSaga';
import homeSaga from 'saga/homeSaga';
import navigationSaga from 'saga/navigationSaga';

export function delay(timeout) {
  return new Promise((resolve) => {
    _.delay(resolve, timeout);
  });
}

export default function* () {
  yield all([
    fork(appSaga),
    fork(authSaga),
    fork(navigationSaga),
    fork(homeSaga),
    fork(accountSaga),
  ]);
}
