import { selectCurrentLocation } from './../selectors/mapSelectors';
import { useSelector } from 'react-redux';
import { receiveLocationsTestDrive } from './../actions/dealerLocationActions';
import { REQUEST_TEST_DRIVE_AVAIL_ACTION, RECEIVE_TEST_DRIVE_AVAIL_ACTION } from './../actionTypes/dealerLocationActionTypes';
import { all, put, select, take, takeLatest } from 'redux-saga/effects'
import { getDealerLocationsApi, requestAvailDealerTestDriveApi } from "../network/index";
import { createAction } from "../actions";
import { delay } from "./index";
import { DealerLocation, BookingStaff } from "../types/modelTypes";
import {
    ERROR_DEALER_LOCATION_LIST,
    REQUEST_DEALER_LOCATION_LIST,
    UPDATE_DEALER_LOCATION_LIST
} from "../actionTypes/dealerLocationActionTypes";
import { DealerLocationBuilder } from "../builders";
import { updateDealerLocations } from "../actions/dealerLocationActions";

function* requestDealerLocations() {
    try {
        const currentLocation = yield select(selectCurrentLocation)
        const _result: DealerLocation[] = (yield getDealerLocationsApi({
            // lat: currentLocation ? currentLocation.latitude : null,
            // lng: currentLocation ? currentLocation.longitude : null
            lat: null,
            lng: null
        }) || []).map((_location: any) => {
            return DealerLocationBuilder.fromApiData(_location);
        });
        yield put(updateDealerLocations(_result));
    } catch (e) {
        yield put(createAction(ERROR_DEALER_LOCATION_LIST, {
            error: e
        }));
    }
}

function* requestLocationsAvailTestDrive(action: any) {
    const {
        carId
    } = action
    try {
        const _result = yield requestAvailDealerTestDriveApi({
            car_ids: [carId]
        })
        if (_result && _result[0] && _result[0].addresses && _result[0].addresses.length > 0) {
            const _address: DealerLocation[] = _result[0].addresses.map((_location: any) => {
                return DealerLocationBuilder.carAvailFromApiData(_location);
            })
            yield put(receiveLocationsTestDrive(_address));
        }
    } catch (e) {

    }
}

function* watchGetDealerLocationListAction() {
    yield takeLatest(REQUEST_DEALER_LOCATION_LIST, requestDealerLocations);
}

function* watchGetTestDriveAvailAction() {
    yield takeLatest(REQUEST_TEST_DRIVE_AVAIL_ACTION, requestLocationsAvailTestDrive);
}

export default function* () {
    yield all([watchGetDealerLocationListAction(), watchGetTestDriveAvailAction()]);
}
