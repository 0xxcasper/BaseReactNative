import { selectFilterCarModel } from './../selectors/newCarSelectors';
import { NewCarModel, FilterNewCarModel, FilterNewCarModelOutput } from './../types/newCarModelTypes';
import { receiveNewCarList as receiveNewCarListAction, receiveNewCarInfoDetail as receiveNewCarInfoDetailAction, receiveFilterCarAction } from './../actions/newCarActions';
import { all, put, take, takeLatest, select } from 'redux-saga/effects';
import { requestNewCarListApi, requestNewCarInfoDetailApi, requestDownloadPriceApi, requestDownloadSpecificationsApi } from "../network/index";
import { REQUEST_NEW_CAR_LIST, REQUEST_NEW_CAR_INFO_DETAIL, REQUEST_FILTER_CAR, REQUEST_DOWNLOAD_SPECIFICATION, REQUEST_DOWNLOAD_PRICE } from './../actionTypes/newCarActionTypes';
import { CBErrorType } from './../types/errors';
import { FilterCarBuilder } from '../builders';
import { CHECK_CAR_SHOWING_WITH_ID } from '../actionTypes/newCarActionTypes';
import { isBlank } from '../helpers';
import { selectListCarDetailMap } from '../selectors/newCarSelectors';
import { NewCarInfoDetail } from '../types/newCarModelTypes';
import { requestNewCarInfoDetail, updateNewCarInfoDetail } from '../actions/newCarActions';
import { TIME_DAY, TIME_WEEK } from '../common/const';
import { setAppLoadingAction } from '../actions/appActions';

function* _requestNewCarList(resolve: () => void, reject: (error?: CBErrorType | null | undefined) => void) {
    try {
        const _result = yield requestNewCarListApi()
        resolve && resolve()
        if (_result) {
            let _newCars: NewCarModel[] = []
            _result.forEach((_carModel: NewCarModel) => {
                _newCars.push(_carModel)
            });
            yield put(receiveNewCarListAction(_newCars))
        }
    } catch (error) {
        reject && reject({
            code: error?.code,
            message: error?.message
        });
    }
}

function* _requestNewCarInfoDetail(action: any) {
    const {
        carId,
    } = action
    try {
        yield put(setAppLoadingAction(true))
        const _result = yield requestNewCarInfoDetailApi(carId)
        yield put(receiveNewCarInfoDetailAction(_result))
    } catch (error) {
    } finally {
        yield put(setAppLoadingAction(false))
    }
}

function* watchNewCarList() {
    while (true) {
        const {
            resolve,
            reject
        } = yield take(REQUEST_NEW_CAR_LIST);
        yield _requestNewCarList(resolve, reject);
    }
}

function* _requestFilterCar(action: any) {
    const {
        filterModel,
        resolve,
        reject
    } = action
    try {
        const _params: FilterNewCarModelOutput | null = FilterCarBuilder.fromModel(filterModel)
        const _result = yield requestNewCarListApi(_params)
        resolve && resolve()
        if (_result) {
            let _newCars: NewCarModel[] = []
            _result.forEach((_carModel: NewCarModel) => {
                _newCars.push(_carModel)
            });
            yield put(receiveFilterCarAction(_newCars))
        }
    } catch (error) {
        reject && reject({
            code: error?.code,
            message: error?.message
        });
    }
}

function* _requestDownloadCarPrice(action: any) {
    const {
        resolve,
        reject
    } = action
    try {
        const _result = yield requestDownloadPriceApi({
            fileName: "/BANG_GIA_XE_",
            method: "POST"
        })
        console.log('_result', _result);
        if (_result) {
            const { redirects } = _result
            if (redirects && redirects.length > 0) {
                const _path = redirects[0]
                resolve && resolve(_path)
            }
        }
    } catch (error) {
        reject && reject({
            code: error?.code,
            message: error?.message
        });
    }
}

function* _requestDownloadCarSpecifications(action: any) {
    const {
        carGrade,
        resolve,
        reject
    } = action
    try {
        const _result = yield requestDownloadSpecificationsApi(carGrade, {
            fileName: "/THONG_SO_KY_THUAT_",
            method: "GET" 
        })
        if (_result) {
            const { redirects } = _result
            if (redirects && redirects.length > 0) {
                const _path = redirects[0]
                resolve && resolve(_path)
            }
        }
    } catch (error) {
        reject && reject({
            code: error?.code,
            message: error?.message
        });
    }
}

function* _checkCarShowingWithId(action: any) {
    const {
        carId,
    } = action
    try {
        if (!isBlank(carId)) {
            const _carMap: Map<string, NewCarInfoDetail> = yield select(selectListCarDetailMap)
            if (_carMap && _carMap.size > 0) {
                const _carDetail = _carMap.get(carId + '')
                if (_carDetail) {
                    const {
                        createTimeMs
                    } = _carDetail
                    if (Date.now() - createTimeMs > TIME_WEEK) {
                        yield put(requestNewCarInfoDetail(carId))
                    } else {
                        yield put(updateNewCarInfoDetail(_carDetail))
                    }
                } else {
                    yield put(requestNewCarInfoDetail(carId))
                }
            } else {
                yield put(requestNewCarInfoDetail(carId))
            }
        }
    } catch (error) {
    }
}

function* watchGetNewCarDetail() {
    yield takeLatest(REQUEST_NEW_CAR_INFO_DETAIL, _requestNewCarInfoDetail)
}

function* watchFilterCar() {
    yield takeLatest(REQUEST_FILTER_CAR, _requestFilterCar)
}

function* watchDownloadCarPrice() {
    yield takeLatest(REQUEST_DOWNLOAD_PRICE, _requestDownloadCarPrice)
}

function* watchDownloadCarSpecifications() {
    yield takeLatest(REQUEST_DOWNLOAD_SPECIFICATION, _requestDownloadCarSpecifications)
}

function* watchCheckCarShowing() {
    yield takeLatest(CHECK_CAR_SHOWING_WITH_ID, _checkCarShowingWithId)
}

export default function* () {
    yield all([
        watchNewCarList(),
        watchGetNewCarDetail(),
        watchFilterCar(),
        watchDownloadCarPrice(),
        watchDownloadCarSpecifications(),
        watchCheckCarShowing()
    ]);
}
