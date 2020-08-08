import { selectCurrentPage, selectTotalPages } from './../selectors/usedCarSelectors';
import { receiveUsedCarList, receiveUsedCarDetail } from './../actions/usedCarActions';
import { REQUEST_USED_CAR_LIST, REQUEST_USED_CAR_DETAIL } from './../actionTypes/usedCarActionTypes';
import { all, takeLatest, put, select } from 'redux-saga/effects';
import { getUsedCarListApi, getUsedCarDetailApi } from "../network/index";
import { UsedCarModel } from '../types/newCarModelTypes';
import { setAppLoadingAction } from '../actions/appActions';
import { FilterCarBuilder } from '../builders';

function* _requestUsedCarList(action: any) {
    const {
        searchKey,
        filterModel
    } = action
    try {
        const _currentPage = yield select(selectCurrentPage)
        const _totalPage = yield select(selectTotalPages)
        if(_currentPage == _totalPage) {
            return;
        }
        yield put(setAppLoadingAction(true))
        const _pagingModel = {
            type: 'paging',
            page: _currentPage + 1,
            per_page: 10
        }
        const _filterModel = FilterCarBuilder.usedCarFilter(searchKey, filterModel)
        console.log('_filterModel', _filterModel);
        const { data, meta } = yield getUsedCarListApi(Object.assign(_pagingModel, _filterModel))
        if (data && data.length > 0) {
            const {
                current_page,
                total_pages
            } = meta.pagination
            yield put(receiveUsedCarList(data, total_pages, current_page))
        }
        yield put(setAppLoadingAction(false))
    } catch (error) {
        yield put(setAppLoadingAction(false))
    }
}

function* _requestUsedCarDetail(action: any) {
    const {
        params
    } = action
    try {
        yield put(setAppLoadingAction(true))
        const _result = yield getUsedCarDetailApi(params)
        if (_result && params && params.carId) {
            yield put(receiveUsedCarDetail(_result, params.carId))
            yield put(setAppLoadingAction(false))
        }
    } catch (error) {
        yield put(setAppLoadingAction(false))
    }
}

function* watchRequestUsedCarList() {
    yield takeLatest(REQUEST_USED_CAR_LIST, _requestUsedCarList);
}

function* watchRequestUsedCarDetail() {
    yield takeLatest(REQUEST_USED_CAR_DETAIL, _requestUsedCarDetail);
}

export default function* () {
    yield all([
        watchRequestUsedCarList(), 
        watchRequestUsedCarDetail()
    ]);
}