import { setAppLoadingAction } from './../actions/appActions';
import { receiveAccessoryModel } from './../actions/carActions';
import { CarModelTestDrive } from './../types/modelTypes';
import { CarBrandDealerBuilder, TestDriveBuilder, CarBuilder } from './../builders';
import fireStore from '@react-native-firebase/firestore';
import { eventChannel } from 'redux-saga';
import { all, fork, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { createAction } from "../actions";
import { setCarInfos as setCarInfosAction, updateCarBrandsFromApi as updateCarBrandsAction, updateCarEditor as updateCarEditorAction, updateCarBrandDealer as updateCarBrandDealerAction, updateCarAvailTestDrive } from "../actions/carActions";
import {
    REQUEST_CAR_BRAND_LIST,
    REQUEST_CAR_BRAND_LIST_ERROR,
    REQUEST_CAR_BRAND_LIST_OK,
    REQUEST_CAR_LIST,
    REQUEST_CAR_LIST_ERROR,
    REQUEST_DELETE_CAR,
    REQUEST_UPDATE_CAR,
    START_EDIT_CAR,
    REQUEST_CAR_BRAND_DEALER,
    REQUEST_CAR_AVAIL_TEST_DRIVE,
    REQUEST_ACCESSORY
} from "../actionTypes/carActionTypes";
import { CarInfoBuilder } from "../builders";
import { TIME_DAY, TIME_SEC, SERVICE_HISTORY, FIRE_BASE_ITEMS } from "../common/const";
import { addCars, deleteCars, getAllCarBrandsApi, requestCarBrandDealerApi, requestAvailCarTestDriveApi, requestAvailDealerTestDriveApi, getAccessoryDetail } from '../network/index';
import { selectFirebaseDocId, selectToken } from "../selectors/authSelectors";
import { selectCarBrandMap, selectCarEditorMap, selectCarInfoMap } from "../selectors/carSelectors";
import { FirebaseDataServiceHistoryCarItems } from "../types/firebaseDataTypes";
import { CarBrand, CarEditor, CarInfo } from "../types/modelTypes";
import { delay } from "./index";

const _EXPIRE_DATA_TIME = TIME_DAY * 3;

function* requestCarList() {
    const _firebaseDocId = yield select(selectFirebaseDocId);
    
    if(!_firebaseDocId) return;

    const docReference  =   fireStore()
                                .collection(SERVICE_HISTORY)
                                .doc(_firebaseDocId);
    /**
     * Snapshot real time event 
     */
    const channel       =   eventChannel(emit => {
                                    return docReference.onSnapshot(emit)
                                })
    try {
        /**
         * Catch Snapshot from FireBase
         */
        while (true) {
            const _documentSnapshot                                  =  yield take(channel)
            const _carsOwner: FirebaseDataServiceHistoryCarItems[]   =  _documentSnapshot.get(FIRE_BASE_ITEMS);
            if (_carsOwner && _carsOwner.length > 0) {
                yield put(setCarInfosAction(_carsOwner?.map((_carModel) => {
                    return CarInfoBuilder.fromFirebaseData(_carModel);
                })));
            }
        }
    } catch (e) {
        yield put(createAction(REQUEST_CAR_LIST_ERROR));
    }
}

function* requestCarModelList() {
    try {
        const _carBranMap = yield select(selectCarBrandMap);
        if (_carBranMap && _carBranMap.size > 0) {
            const _checkItem: CarBrand = _carBranMap.toIndexedSeq().toArray()[0];
            if ((Date.now() - _checkItem.updateTime) < _EXPIRE_DATA_TIME) {
                console.log('****Data still good*****');
                yield put(createAction(REQUEST_CAR_BRAND_LIST_OK));
                return;
            }
        }
        const _carBrands = yield getAllCarBrandsApi();
        if (_carBrands) {
            yield put(updateCarBrandsAction(_carBrands));
        }
        yield put(createAction(REQUEST_CAR_BRAND_LIST_OK));
    } catch (e) {
        yield put(createAction(REQUEST_CAR_BRAND_LIST_ERROR));
    }
}

function* updateCar(action: any) {
    const {
        carId,
        resolve,
        reject,
    } = action;
    const _carEditor: CarEditor | null | undefined = (yield select(selectCarEditorMap))?.get(carId || '');
    if (_carEditor) {
        try {
            const _addCarResult = yield addCars(CarInfoBuilder.toAddCarApiData(_carEditor), carId);
            console.log("Add car: ", _addCarResult, _carEditor);
            resolve && resolve();
        } catch (error) {
            console.log("Add car error: ", error);
            const { errors } = error
            if (errors) {
                let message: string[] = []
                const _errors: string[][] = Object.values(errors)
                _errors.forEach((item: string[]) => {
                    message.push(item[0])
                })
                reject && reject({
                    code: error?.code,
                    message: message.join('\n')
                });
                return
            }
            reject && reject({
                code: error?.code,
                message: error?.message
            });
        }
    }
}

function* deleteCar(action: any) {
    const {
        carId,
        resolve,
        reject
    } = action
    const _carId = carId
    const token = yield select(selectToken);
    if (_carId) {
        try {
            const _deleteCarResult = yield deleteCars(token, carId);
            console.log("Delete car: ", _deleteCarResult);
            resolve && resolve();
        } catch (error) {
            console.log("Delete car error: ", error);
            reject && reject({
                code: error?.code,
                message: error?.message
            });
        }
    }
}

function* starEditCar(action: any) {
    const {
        carId
    } = action
    if (carId) {
        const _carInfo: CarInfo = (yield select(selectCarInfoMap))?.get(carId);
        console.log("===>>> Current car info: ", _carInfo);
        if (_carInfo) {
            const _carEditor: CarEditor = {
                id: carId,
                carBrandId: _carInfo?.brandId,
                carModelId: _carInfo?.modelId,
                carGradeId: _carInfo?.gradeId,
                imageUrls: (_carInfo?.imageUrl) ? [_carInfo.imageUrl] : null,
                odo: _carInfo?.odo,
                plateNumber: _carInfo?.plate,
                registrationExpiredTimeMs: _carInfo?.registryTimeMs,
                relationship: _carInfo?.relationships,
                insurances: _carInfo.insurances,
                vinNumber: _carInfo?.vin,
            }
            yield put(updateCarEditorAction(_carEditor));
        }
    }
}


function* updateCarBrandDealer() {
    try {
        const _result = (yield requestCarBrandDealerApi() || []).map((_carBrand: any) => {
            return CarBrandDealerBuilder.fromApi(_carBrand)
        })
        if (_result) {
            yield put(updateCarBrandDealerAction(_result))
        }
    } catch (error) {

    }
}

function* requestAvailCarTestDrive() {
    try {
        const _result: CarModelTestDrive[] | null = (yield requestAvailCarTestDriveApi() || []).map((_car: any) => {
            return TestDriveBuilder.carFromApi(_car)
        })
        if (_result) {
            yield put(updateCarAvailTestDrive(_result))
        }
    } catch (error) {

    }
}

function* _requestAccessory(action: any) {
    const {
        carId
    } = action
    yield put(setAppLoadingAction(true))
    try {
        const _result = CarBuilder.updateAccessory(yield getAccessoryDetail(carId))
        yield put(receiveAccessoryModel(carId, _result))
        yield put(setAppLoadingAction(false))
    } catch (error) {
        yield put(setAppLoadingAction(false))
    }
}

function* watchCarListAction() {
    yield takeLatest(REQUEST_CAR_LIST, requestCarList);
}

function* watchStarEditCarCarAction() {
    yield takeLatest(START_EDIT_CAR, starEditCar);

}

function* watchDeleteCarAction() {
    yield takeLatest(REQUEST_DELETE_CAR, deleteCar);
}

function* watchUpdateCarAction() {
    yield takeLatest(REQUEST_UPDATE_CAR, updateCar);
}

function* watchCarBrandDealer() {
    yield takeLatest(REQUEST_CAR_BRAND_DEALER, updateCarBrandDealer);
}

function* watchCarAvailTestDrive() {
    yield take(REQUEST_CAR_AVAIL_TEST_DRIVE);
    yield requestAvailCarTestDrive()
}

function* watchRequestAccessory() {
    yield takeLatest(REQUEST_ACCESSORY, _requestAccessory);
}

function* watchCarBrandAction() {
    while (true) {
        yield take(REQUEST_CAR_BRAND_LIST);
        yield requestCarModelList();
        const { type } = yield take([REQUEST_CAR_BRAND_LIST_OK, REQUEST_CAR_BRAND_LIST_ERROR]);
        if (type === REQUEST_CAR_BRAND_LIST_OK) {
            break;
        } else {
            yield delay(TIME_SEC * 10);
        }
    }
}

export default function* () {
    yield all([
        fork(watchCarListAction),
        fork(watchCarBrandAction),
        fork(watchUpdateCarAction),
        fork(watchDeleteCarAction),
        fork(watchStarEditCarCarAction),
        fork(watchCarBrandDealer),
        fork(watchCarAvailTestDrive),
        fork(watchRequestAccessory)
    ]);
}
