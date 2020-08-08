import _ from 'lodash';
import {all, fork} from 'redux-saga/effects';
import accountSaga from './accountSaga';
import appSaga from './appSaga';
import authSaga from './authSaga';
import consultantServiceSaga from './bookingSaga';
import carSaga from './carSaga';
import dealerLocationSaga from './dealerLocationSaga';
import enumSaga from './enumSaga';
import experimentalSaga from './experimentalSaga';
import homeSaga from './homeSaga';
import navigationSaga from './navigationSaga';
import promotionSaga from './promotionSaga';
import notificationSaga from './notificationSaga';
import newCarSaga from './newCarSaga';
import carCompareSaga from './carCompareSaga';
import costEstimateSaga from './costEstimateSaga';
import testDriveSaga from './testDriveSaga';
import financeSaga from "./financeSaga";
import insuranceSaga from "./insuranceSaga";
import usedCarSaga from './usedCarSaga';
import productEnumSaga from "./productEnumSaga";
import mapSaga from './mapSaga';
import costEstimateUsedCarSaga from "./costEstimateUsedCarSaga";
import calendarSaga from "./calendarSaga";
import chatSaga from './chatSaga';
import surveysSaga from './surveysSaga';

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
    fork(consultantServiceSaga),
    fork(dealerLocationSaga),
    fork(homeSaga),
    fork(experimentalSaga),
    fork(accountSaga),
    fork(carSaga),
    fork(promotionSaga),
    fork(notificationSaga),
    fork(newCarSaga),
    fork(carCompareSaga),
    fork(costEstimateSaga),
    fork(testDriveSaga),
    fork(financeSaga),
    fork(insuranceSaga),
    fork(usedCarSaga),
    fork(productEnumSaga),
    fork(mapSaga),
    fork(costEstimateUsedCarSaga),
    fork(calendarSaga),
    fork(chatSaga),
    fork(surveysSaga),
    enumSaga(),
  ]);
}
