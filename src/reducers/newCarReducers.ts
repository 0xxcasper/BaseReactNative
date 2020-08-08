import { Map } from 'immutable';
import _ from 'lodash';
import { NewCarActionTypes, UPDATE_CAR_SHOWING_ID, UpdateCarShowingId, UPDATE_NEW_CAR_INFO_DETAIL, UpdateNewCarInfoDetail } from '../actionTypes/newCarActionTypes';
import { CLEAR_CAR_FILTER } from './../actionTypes/enumActionTypes';
import { CLEAR_NEW_CAR_INFO_DETAIL, ReceiveCarFilter, ReceiveNewCarInfoDetail, ReceiveNewCarList, RECEIVE_FILTER_CAR, RECEIVE_NEW_CAR_INFO_DETAIL, RECEIVE_NEW_CAR_LIST, RequestSearchCar, REQUEST_SEARCH_CAR, UpdateFilterNewCar, UPDATE_FILTER_NEW_CAR } from './../actionTypes/newCarActionTypes';
import { isBlank, sortCollections } from './../helpers';
import { Competitor, ExteriorImage, Feature, FilterNewCarModel, NewCarInfoDetail, NewCarModel, OtherGrade, Overview } from './../types/newCarModelTypes';
import { NewCarStateType } from './../types/reducerStateTypes';
import { CarBuilder } from '../builders';

export const _initFilterNewCarModel: FilterNewCarModel = {
    keyItemPrice: undefined,
    priceFrom: undefined,
    priceTo: undefined,
    carModelIds: undefined,
    fuelTypes: undefined,
    seats: undefined,
    sourceIds: undefined,
    typeIds: undefined,
}
const _initCarIdDetailShowing = null

const _initState: NewCarStateType = {
    newCarInfoMap: Map<string, NewCarModel>(),
    newCarInfoDisplayMap: Map<string, NewCarModel>(),
    newCarInfoDetail: undefined,
    filterNewCarModel: _initFilterNewCarModel,
    updateCarListTime: 0,
    newCarDetailMap: Map<string, NewCarInfoDetail>(),
    carIdDetailShowing: _initCarIdDetailShowing
};

const _updateNewCarList = (state: NewCarStateType, action: NewCarActionTypes): NewCarStateType => {
    const _action = action as ReceiveNewCarList;
    const {
        newCars
    } = _action;
    if (newCars) {
        var _newCarInfoMap = Map<string, NewCarModel>()
        newCars.forEach((_newCar: NewCarModel) => {
            _newCarInfoMap = _newCarInfoMap.set(_newCar.id + '', _newCar);
        })
        state = {
            ...state,
            newCarInfoMap: _newCarInfoMap,
            newCarInfoDisplayMap: _.cloneDeep(_newCarInfoMap),
            updateCarListTime: Date.now()
        }
    }
    return state;
};

const _updateNewInfoDetail = (state: NewCarStateType, action: NewCarActionTypes): NewCarStateType => {
    const _action = action as ReceiveNewCarInfoDetail;
    const {
        newCarInfo
    } = _action;

    if (newCarInfo) {
        let {
            newCarDetailMap
        } = state
        const {
            id
        } = newCarInfo
        const _carDetail = CarBuilder.formApi(newCarInfo)
        newCarDetailMap = newCarDetailMap.set(id + '', _.cloneDeep(_carDetail!))
        state = {
            ...state,
            newCarInfoDetail: _carDetail,
            newCarDetailMap
        }
    }
    return state;
};

const _updateCarDetail = (state: NewCarStateType, action: NewCarActionTypes): NewCarStateType => {
    const _action = action as UpdateNewCarInfoDetail;
    const {
        newCarInfo
    } = _action;
    if (newCarInfo) {
        state = {
            ...state,
            newCarInfoDetail: _.cloneDeep(newCarInfo),
        }
    }
    return state;
};

const _clearNewInfoDetail = (state: NewCarStateType, action: NewCarActionTypes): NewCarStateType => {
    return {
        ...state,
        newCarInfoDetail: undefined
    };
};

const _searchCarGradeWithInput = (state: NewCarStateType, action: NewCarActionTypes): NewCarStateType => {
    const _action = action as RequestSearchCar
    const {
        searchKey
    } = _action

    const {
        newCarInfoMap,
    } = state

    if (isBlank(searchKey)) {
        return {
            ...state,
            newCarInfoDisplayMap: _.cloneDeep(newCarInfoMap)
        };
    }
    const _carGradeList = newCarInfoMap.valueSeq().toArray().filter((_carInfo) => {
        return _carInfo.name.toUpperCase().includes(searchKey!.toUpperCase())
    })
    
    var _newCarInfoDisplayMap = Map<string, NewCarModel>()
    _carGradeList.forEach((_newCar: NewCarModel) => {
        _newCarInfoDisplayMap = _newCarInfoDisplayMap.set(_newCar.id + '', _newCar);
    })
    return {
        ...state,
        newCarInfoDisplayMap: _newCarInfoDisplayMap
    };
};


const _updateFilterNewCar = (state: NewCarStateType, action: NewCarActionTypes): NewCarStateType => {
    const _action = action as UpdateFilterNewCar
    const {
        filterModel
    } = _action

    return {
        ...state,
        filterNewCarModel: filterModel
    };
};

const _receiveFilterNewCar = (state: NewCarStateType, action: NewCarActionTypes): NewCarStateType => {
    const _action = action as ReceiveCarFilter
    const {
        newCars
    } = _action
    if (newCars) {
        var _newCarInfoMap = Map<string, NewCarModel>()
        newCars.forEach((_newCar: NewCarModel) => {
            _newCarInfoMap = _newCarInfoMap.set(_newCar.id + '', _newCar);
        })
        state = {
            ...state,
            newCarInfoDisplayMap: _newCarInfoMap
        }
    }
    return state;
};

const _clearCarFilter = (state: NewCarStateType, action: NewCarActionTypes): NewCarStateType => {
    return {
        ...state,
        filterNewCarModel: _initFilterNewCarModel
    };
};

const _updateCarShowingId = (state: NewCarStateType, action: NewCarActionTypes): NewCarStateType => {
    const _action = action as UpdateCarShowingId
    const {
        carId
    } = _action
    return {
        ...state,
        carIdDetailShowing: carId
    };
};

export default (state = _initState, action: NewCarActionTypes): NewCarStateType => {
    switch (action.type) {
        case RECEIVE_NEW_CAR_LIST:
            return _updateNewCarList(state, action);
        case RECEIVE_NEW_CAR_INFO_DETAIL:
            return _updateNewInfoDetail(state, action);
        case CLEAR_NEW_CAR_INFO_DETAIL:
            return _clearNewInfoDetail(state, action);
        case REQUEST_SEARCH_CAR:
            return _searchCarGradeWithInput(state, action);
        case UPDATE_FILTER_NEW_CAR:
            return _updateFilterNewCar(state, action);
        case RECEIVE_FILTER_CAR:
            return _receiveFilterNewCar(state, action);
        case CLEAR_CAR_FILTER:
            return _clearCarFilter(state, action);
        case UPDATE_CAR_SHOWING_ID:
            return _updateCarShowingId(state, action);
        case UPDATE_NEW_CAR_INFO_DETAIL:
            return _updateCarDetail(state, action);
        default:
    }
    return state;
}


export const newCarStateToJs = (state: NewCarStateType): any => {
    const {
        newCarInfoMap,
        newCarInfoDisplayMap,
        newCarInfoDetail,
        filterNewCarModel,
        updateCarListTime,
        newCarDetailMap,
        carIdDetailShowing
    } = state;
    return {
        newCarInfoMap: Map(newCarInfoMap),
        newCarInfoDisplayMap: Map(newCarInfoDisplayMap),
        newCarInfoDetail,
        filterNewCarModel,
        updateCarListTime,
        newCarDetailMap: newCarDetailMap.toObject(),
        carIdDetailShowing
    }
};

export const newCarStateFromJs = (state: any): NewCarStateType => {
    const {
        newCarInfoMap,
        updateCarListTime,
        newCarDetailMap,
    } = state;
    return {
        ..._initState,
        newCarInfoMap: Map(newCarInfoMap),
        newCarInfoDisplayMap: newCarInfoMap,
        newCarInfoDetail: undefined,
        filterNewCarModel: _initFilterNewCarModel,
        updateCarListTime,
        newCarDetailMap: Map<string, any>(newCarDetailMap).map((_carDetail: any): NewCarInfoDetail => {
            const {
                overview,
                features,
                competitors,
                otherGrades,
                colors
            } = _carDetail;
            return {
                ..._carDetail,
                overview: Map(overview),
                features: Map(features),
                competitors: Map(competitors),
                otherGrades: Map(otherGrades),
                colors: Map(colors)
            }
        }),
        carIdDetailShowing: _initCarIdDetailShowing
    }
};
