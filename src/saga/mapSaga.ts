import { setAppLoadingAction } from './../actions/appActions';
import { selectAppLoading } from './../selectors/appSelectors';
import { receiveLocationNearly } from './../actions/mapActions';
import { selectCurrentLocation } from './../selectors/mapSelectors';
import { REQUEST_LOCATION_NEARLY } from './../actionTypes/mapActionTypes';
import { all, takeLatest, select, put } from 'redux-saga/effects';
import { getLocationNearlyApi, getLocationBySearchApi } from "../network/index";
import _const from '../common/const';
import ServerPath from '../network/net/ServerPath';
import { REQUEST_LOCATION_BY_SEARCH } from '../actionTypes/mapActionTypes';
import { result } from 'lodash';

function* _requestLocationNearly(action: any) {
    const { typeSearch, radius } = action
    yield put(setAppLoadingAction(true))
    try {
        const _currentLocation = yield select(selectCurrentLocation)
        if (_currentLocation) {
            const _result = yield getLocationNearlyApi({
                location: `${_currentLocation.latitude},${_currentLocation.longitude}`,
                radius: radius ? radius : 10000,
                type: typeSearch,
                key: _const.GOOGLE_API_KEY
            }, {
                hideHeader: true
            })
            yield put(setAppLoadingAction(false))
            if (_result && _result.results && _result.results.length > 0) {
                const { results } = _result
                yield put(receiveLocationNearly(typeSearch, results))
            }
            return
        }
        yield put(setAppLoadingAction(false))
    } catch (error) {
        yield put(setAppLoadingAction(false))
    }
}

function* _requestLocationBySearch(action: any) {
    const { searchText } = action
    try {
        const _currentLocation = yield select(selectCurrentLocation)
        if(_currentLocation) {
            const _result = yield getLocationBySearchApi({
                query: searchText,
                location: _currentLocation.latitude + ',' + _currentLocation.longitude,
                radius: 10000,
                key: _const.GOOGLE_API_KEY
            })
            if(_result && _result.results) {
                const { results } = _result
                yield put(receiveLocationNearly(searchText, results))
            }
        }
    } catch (error) {
    }
}

function* watchRequestLocationNearly() {
    yield takeLatest(REQUEST_LOCATION_NEARLY, _requestLocationNearly);
}

function* watchRequestLocationBySearch() {
    yield takeLatest(REQUEST_LOCATION_BY_SEARCH, _requestLocationBySearch);
}


export default function* () {
    yield all([
        watchRequestLocationNearly(),
        watchRequestLocationBySearch()
    ]);
}