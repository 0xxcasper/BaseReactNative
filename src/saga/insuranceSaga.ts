import {all, put, takeLatest} from 'redux-saga/effects'
import {getInsuranceRateApi} from "../network/index";
import {REQUEST_INSURANCE_RATE} from "../actionTypes/insuranceActionTypes";
import {receiveInsuranceRate} from "../actions/insuranceAction";

function* _requestInsuranceRate(actions: any) {
  const { carId, resolve, reject } = actions
  try {
      const result = yield getInsuranceRateApi(carId);
      if(result) {
          yield put(receiveInsuranceRate(result));
      }
      resolve && resolve()
  } catch (error) {
    reject && reject({
        code: error?.code,
        message: error?.message
    });
  }
}

function* watchInsuranceRateAction() {
  yield takeLatest(REQUEST_INSURANCE_RATE, _requestInsuranceRate)
}

export default function* () {
    yield all([watchInsuranceRateAction()]);
}
