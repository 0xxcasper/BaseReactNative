import { selectNewCarInfoMap } from './../selectors/newCarSelectors';
import _ from 'lodash';
import { all, put, takeLatest, select } from 'redux-saga/effects';
import { requestCarCompareApi, requestCarCompareSuggestionApi } from "../network/index";
import {
    receiveCarCompareAction,
    receiveSuggestionCompare as receiveSuggestionCompareAction,
    receiveChooseCarCompareAction,
    receiveSuggestionCompareMerge as receiveSuggestionCompareMergeAction
} from './../actions/carCompareActions';
import { REQUEST_CAR_COMPARE, REQUEST_SUGGESTION_CAR_COMPARE, DID_CHOOSE_CAR_COMPARE } from './../actionTypes/carCompareActionTypes';
import { CarCompareBuilder } from './../builders';
import { CarCompareModel, CarCompareSuggestionModel } from './../types/newCarModelTypes';
import { isBlank } from '../helpers';
import { setAppLoadingAction } from '../actions/appActions';

function* _requestCarCompare(action: any) {
    const {
        carIds
    } = action
    yield put(setAppLoadingAction(true)) 
    try {       
        const _result = (yield requestCarCompareApi(carIds) || []).map((_carCompare: any): CarCompareModel => {
            return CarCompareBuilder.fromApiData(_carCompare);
        });

        const builderOverview = CarCompareBuilder.fromTwoCarOverView(_result[0].overview, _result[1].overview)
        const builderFeatures = CarCompareBuilder.fromTwoCarGetFeatures(_result[0].features, _result[1].features)
        if (_result) {
            yield put(receiveCarCompareAction(_result, builderOverview, builderFeatures))
        }
        yield put(setAppLoadingAction(false)) 
    } catch (e) {
        yield put(setAppLoadingAction(false)) 
    }
}

function* _requestCarCompareSuggestion(action: any) {
    const {
        carId
    } = action
    try {
        const _result = ((yield requestCarCompareSuggestionApi(carId) || []).map((_carCompare: any[]): CarCompareSuggestionModel[] | null | undefined => {
            return CarCompareBuilder.fromSuggestionApiData(_carCompare);
        }));
        if (isBlank(carId) && _result) {
            yield put(receiveSuggestionCompareAction(_result))
            return;
        } else if (_result) {
            yield put(receiveSuggestionCompareMergeAction(_result, carId))
        }
    } catch (e) {
    }
}

function* _chooseCarCompare(action: any) {
    const {
        carId,
        isFirst
    } = action
    try {
        const _result = yield select(selectNewCarInfoMap)
        if (_result && _result.size > 0) {
            const _carModel = _result.get(carId)
            if (_carModel) {
                yield put(receiveChooseCarCompareAction(_carModel, isFirst))
            }
        }
    } catch (e) {
    }
}

function* watchRequestCarCompare() {
    yield takeLatest(REQUEST_CAR_COMPARE, _requestCarCompare);
}

function* watchRequestCarCompareSuggestion() {
    yield takeLatest(REQUEST_SUGGESTION_CAR_COMPARE, _requestCarCompareSuggestion);
}

function* watchChooseCarCompare() {
    yield takeLatest(DID_CHOOSE_CAR_COMPARE, _chooseCarCompare);
}

export default function* () {
    yield all([
        watchRequestCarCompare(),
        watchRequestCarCompareSuggestion(),
        watchChooseCarCompare()
    ]);
}
