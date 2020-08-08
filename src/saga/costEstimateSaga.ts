import {all, put, takeLatest} from 'redux-saga/effects'
import {calculateCostEstimateApi, getProvincesApi, requestCostEstimateLocationsApi} from "../network/index";

import {
    CALCULATE_COST_ESTIMATE,
    REQUEST_COST_ESTIMATE_LOCATIONS, REQUEST_PROVINCES
} from "../actionTypes/costEstimateActionTypes";
import {calcCostEstimate, setLocations, setProvinces} from "../actions/costEstimateAction";

function* _requestLocationCostEstimate(actions: any) {
  const { resolve, reject } = actions
  try {
      const result = yield requestCostEstimateLocationsApi();
      if(result) {
          yield put(setLocations(result));
      }
      resolve && resolve()
  } catch (error) {
    reject && reject({
        code: error?.code,
        message: error?.message
    });
  }
}

function* _requestProvince(actions: any) {
  const { resolve, reject } = actions
  try {
      const _provinces = yield getProvincesApi();
      if (_provinces) {
          yield put(setProvinces(_provinces))
      }
      resolve && resolve(_provinces)
  } catch (error) {
      reject && reject({
          code: error?.code,
          message: error?.message
      })
  }
}

function* _calculateCostEstimate(actions: any) {
    const {costEstimate, resolve, reject} = actions
    try {
        const _result = yield calculateCostEstimateApi(costEstimate)
        if (_result) {
            yield put(calcCostEstimate(_result))
            resolve && resolve(_result)
        }
    } catch (error) {
        reject && reject({
            code: error?.code,
            message: error?.message
        })
    }
}

function* watchGetLocationCostEstimateAction() {
  yield takeLatest(REQUEST_COST_ESTIMATE_LOCATIONS, _requestLocationCostEstimate)
}

function* watchGetProvincesAction() {
  yield takeLatest(REQUEST_PROVINCES, _requestProvince)
}

function* watchCalculateCostEstimate() {
  yield takeLatest(CALCULATE_COST_ESTIMATE, _calculateCostEstimate)
}

export default function* () {
    yield all([
        watchGetLocationCostEstimateAction(),
        watchGetProvincesAction(),
        watchCalculateCostEstimate()
    ]);
}
