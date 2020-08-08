import { Map } from 'immutable';
import { UsedCarActionTypes } from '../actionTypes/usedCarActionTypes';
import { RECEIVE_USED_CAR_LIST, ReceiveUsedCarList, RECEIVE_USED_CAR_DETAIL, ReceiveUsedCarDetail, CLEAR_PAGE } from './../actionTypes/usedCarActionTypes';
import { UsedCarModel } from './../types/newCarModelTypes';
import { UsedCarStateType } from './../types/reducerStateTypes';
import { isBlank } from '../helpers';
import { UsedCarDetailModel } from '../types/newCarModelTypes';

const _init_current_page = 0
const _init_total_pages = -1
const _init_searchKey = null
const _initState: UsedCarStateType = {
    usedCarListMap: Map<string, UsedCarModel>(),
    usedCarDetailMap: Map<string, UsedCarDetailModel>(),
    currentPage: _init_current_page,
    totalPages: _init_total_pages,
    searchKey: _init_searchKey
};

const _updateUsedCarList = (state: UsedCarStateType, action: UsedCarActionTypes): UsedCarStateType => {
    const _action = action as ReceiveUsedCarList
    const {
        carList,
        current_page,
        total_pages
    } = _action
    let {
        usedCarListMap
    } = state
    if (carList && carList.length > 0) {

        carList.forEach((_carItem: UsedCarModel) => {
            const {
                used_car_id,
                grade,
                produced_year
            } = _carItem
            let carName = ''
            if (grade) {
                const { grade_name } = grade
                if (!isBlank(grade_name)) {
                    carName += grade_name
                }
            }
            if (!isBlank(produced_year + '')) {
                carName += ' ' + produced_year
            }
            _carItem = {
                ..._carItem,
                carName
            }
            usedCarListMap = usedCarListMap.set(used_car_id + '', _carItem)
        })
    }
    return {
        ...state,
        usedCarListMap,
        currentPage: current_page,
        totalPages: total_pages
    }
};

const _updateUsedCarDetail = (state: UsedCarStateType, action: UsedCarActionTypes): UsedCarStateType => {
    const _action = action as ReceiveUsedCarDetail
    const {
        carDetail,
        carId
    } = _action
    let {
        usedCarDetailMap
    } = state
    if (carDetail && carId) {
        carDetail.createTimeMs = Date.now()
        usedCarDetailMap = usedCarDetailMap.set(carId + '', carDetail)
    }
    return {
        ...state,
        usedCarDetailMap
    }
};

const _clearPage = (state: UsedCarStateType, action: UsedCarActionTypes): UsedCarStateType => {
    return {
        ...state,
        usedCarListMap: Map<string, UsedCarModel>(),
        currentPage: _init_current_page,
        totalPages: _init_total_pages,
        searchKey: _init_searchKey
    }
};

export default (state = _initState, action: UsedCarActionTypes): UsedCarStateType => {
    switch (action.type) {
        case RECEIVE_USED_CAR_LIST:
            return _updateUsedCarList(state, action);
        case RECEIVE_USED_CAR_DETAIL:
            return _updateUsedCarDetail(state, action);
        case CLEAR_PAGE:
            return _clearPage(state, action);
        default:
    }
    return state;
}

export const usedCarStateToJs = (state: UsedCarStateType): any => {
    const {
        usedCarListMap,
        usedCarDetailMap,
        currentPage,
        totalPages,
        searchKey
    } = state;
    return {
        usedCarListMap: usedCarListMap.toObject(),
        usedCarDetailMap: usedCarDetailMap.toObject(),
        currentPage,
        totalPages,
        searchKey
    }
};

export const usedCarStateFromJs = (state: any): UsedCarStateType => {
    const {
        usedCarDetailMap,
        currentPage,
        totalPages,
    } = state;
    return {
        ..._initState,
        usedCarListMap: Map<string, UsedCarModel>(),
        usedCarDetailMap: Map(usedCarDetailMap),
        currentPage: _init_current_page,
        totalPages: _init_total_pages,
        searchKey: _init_searchKey
    }
};
