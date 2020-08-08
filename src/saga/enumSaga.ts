import { setCarFilterProviders } from './../actions/enumActions';
import { REQUEST_CAR_FILTER_ENUM } from './../actionTypes/enumActionTypes';
import { put, takeLatest, take } from 'redux-saga/effects';
import {
    setCarInsuranceProviders as setCarInsuranceProvidersAction,
    setCarInsuranceTypes as setCarInsuranceTypesAction
} from '../actions/enumActions';
import { REQUEST_CAR_INSURANCE_PROVIDERS, REQUEST_CAR_INSURANCE_TYPES } from '../actionTypes/enumActionTypes';
import { getAllInsuranceProvidersApi, getAllInsuranceTypesApi, requestEnumFilterType as requestEnumFilterTypeApi } from '../network/index';
import { EnumEntry } from '../types/modelTypes';

function* getCarInsuranceTypes() {
    try {
        const result = yield getAllInsuranceTypesApi();
        if (result && result.length > 0) {
            const _carInsurance: EnumEntry[] = result.map(({ id, name }: any, _index: number): EnumEntry => {
                return {
                    value: id + '',
                    label: name,
                    sortValue: _index
                };
            });
            yield put(setCarInsuranceTypesAction(_carInsurance));
        }
    } catch (e) {
    }
}

function* getCarInsuranceProviders() {
    try {
        const result = yield getAllInsuranceProvidersApi();
        if (result && result.length > 0) {
            const _carInsuranceProviders: EnumEntry[] = result.map(({ id, name }: any, _index: number): EnumEntry => {
                return {
                    value: id + '',
                    label: name,
                    sortValue: _index
                };
            });
            yield put(setCarInsuranceProvidersAction(_carInsuranceProviders));
        }
    } catch (e) {
    }
}

function* getEnumFilter() {
    try {
        const result = yield requestEnumFilterTypeApi();
        if (result) {
            yield put(setCarFilterProviders(result));
        }
    } catch (e) {
    }
}

export default function* () {
    yield takeLatest(REQUEST_CAR_INSURANCE_TYPES, getCarInsuranceTypes);
    yield takeLatest(REQUEST_CAR_INSURANCE_PROVIDERS, getCarInsuranceProviders);
    yield take(REQUEST_CAR_FILTER_ENUM);
    yield getEnumFilter();
}
