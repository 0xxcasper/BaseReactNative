import {getOnSaleGradeApi, getUsedCarPlateTypeApi, getUsedCarQualityApi, usedCarCostEstimate} from "../network";
import {
    receiveUsedCarOnSaleGrade,
    receiveUsedCarPlateTypes,
    receiveUsedCarQualitys
} from "../actions/costEstimateUsedCarActions";
import {takeLatest, all, put} from "redux-saga/effects";
import {
    REQUEST_ONSALE_GRADES,
    REQUEST_PLATE_TYPES,
    REQUEST_QUALITYS,
    USED_CAR_COST_ESTIMATE
} from "../actionTypes/costEstimateUsedCarActionTypes";

function* _requestUsedCarPlateTypes(actions: any) {
    const { resolve, reject } = actions
    try {
        const _plateTypes = yield getUsedCarPlateTypeApi();
        if (_plateTypes) {
            yield put(receiveUsedCarPlateTypes(_plateTypes))
        }
        resolve && resolve(_plateTypes)
    } catch (error) {
        reject && reject({
            code: error?.code,
            message: error?.message
        })
    }
}

function* _requestUsedCarOnSaleGrade(actions : any) {
    const { resolve, reject } = actions
    try {
        const _grades = yield getOnSaleGradeApi();
        if (_grades) {
            yield put(receiveUsedCarOnSaleGrade(_grades))
        }
        resolve && resolve(_grades)
    } catch (error) {
        reject && reject({
            code: error?.code,
            message: error?.message
        })
    }
}

function* _requestUsedCarQualitys(actions: any) {
    const { resolve, reject } = actions
    try {
        const _qualitys = yield getUsedCarQualityApi()
        if (_qualitys) {
            yield put(receiveUsedCarQualitys(_qualitys))
        }
        resolve && resolve(_qualitys)
    } catch(error) {
        reject && reject({
            code: error?.code,
            message: error?.message
        })
    }
}

function* _submitCostEstimate(actions: any) {
    const {body, resolve, reject} = actions
    try {
        const _result = yield usedCarCostEstimate(body)
        resolve && resolve(_result)
    } catch (error) {
        reject && reject({
            code: error?.code,
            message: error?.message
        })
    }
}

function* watchUsedCarPlateTypes() {
    yield takeLatest(REQUEST_PLATE_TYPES, _requestUsedCarPlateTypes)
}

function* watchUsedCarOnSaleGrades() {
    yield takeLatest(REQUEST_ONSALE_GRADES, _requestUsedCarOnSaleGrade)
}

function* watchUsedCarQualitys() {
    yield takeLatest(REQUEST_QUALITYS, _requestUsedCarQualitys)
}

function* watchUsedCarCostEstimate() {
    yield takeLatest(USED_CAR_COST_ESTIMATE, _submitCostEstimate)
}

export default function* () {
    yield all([
        watchUsedCarPlateTypes(),
        watchUsedCarOnSaleGrades(),
        watchUsedCarQualitys(),
        watchUsedCarCostEstimate()
    ])
}